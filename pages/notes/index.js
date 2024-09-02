import dynamic from "next/dynamic";
import Link from "next/link";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ users }) {
  console.log("user data => ", users);
  return (
    <LayoutComponent
      metaTitle="Notes"
      metaDescription="Ini merupakan halaman notes"
    >
      <div className="text-lg p-4">
        {" "}
        {users.users.map((item) => (
          <div key={item.id} className="bg-gray-200 p-4 m-4 rounded-lg">
            <h2 className="text-sm">
              {" "}
              {item.firstName} {item.lastName}{" "}
            </h2>{" "}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-2 text-sm">
              <Link href={`/notes/${item.id}`}> Detail User </Link>{" "}
            </button>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </LayoutComponent>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/users");
  const users = await res.json();
  return {
    props: {
      users,
    },
    revalidate: 10,
  };
}
