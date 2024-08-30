import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));
const UserByName = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <LayoutComponent
        metaTitle={`User - Details (${id})`}
        metaDescription={`Ini merupakan halaman details dari user : ${id}`}
      >
        <p className="text-lg p-4 font-bold"> Halaman User Details: {id} </p>{" "}
      </LayoutComponent>{" "}
    </>
  );
};

export default UserByName;
