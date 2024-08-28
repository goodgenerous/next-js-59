import Layout from "@/layout";
import { useRouter } from "next/router";

const UserByName = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Layout
        metaTitle={`User - Details (${id})`}
        metaDescription={`Ini merupakan halaman details dari user : ${id}`}
      >
        <p className="text-lg p-4 font-bold"> Halaman User Details: {id} </p>{" "}
      </Layout>{" "}
    </>
  );
};

export default UserByName;
