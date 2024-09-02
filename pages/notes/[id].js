import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function DetailNotes({ users }) {
  console.log("Data user => ", users);
  const router = useRouter();
  return (
    <LayoutComponent
      metaTitle="Detail Notes"
      metaDescription="Ini merupakan halaman detail notes"
    >
      <div className="bg-gray-200 p-4 m-4 rounded-lg">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mb-2 rounded text-sm"
          onClick={() => router.back()}
        >
          {" "}
          Back{" "}
        </button>{" "}
        <p className="text-lg font-bold"> Details User: </p>{" "}
        <p className="text-sm">
          {" "}
          Name: {users.firstName} {users.lastName}{" "}
        </p>{" "}
        <p className="text-sm"> Age: {users.age} </p>{" "}
      </div>{" "}
    </LayoutComponent>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://dummyjson.com/users/");
  const users = await res.json();
  const paths = users.users.map((item) => ({
    params: { id: item.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  const users = await res.json();
  return { props: { users }, revalidate: 10 };
}
