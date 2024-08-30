import Link from "next/link";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));

const Users = () => {
  return (
    <>
      <LayoutComponent
        metaTitle="User"
        metaDescription="Ini merupakan halaman user"
      >
        <p className="text-lg p-4 font-bold"> Halaman User </p>{" "}
        <span className="flex items-center">
          <p className="text-lg pl-4 font-bold">
            {" "}
            Link menuju halaman user details:{" "}
          </p>{" "}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3">
            <Link href="/users/details"> Details User </Link>{" "}
          </button>{" "}
        </span>{" "}
      </LayoutComponent>{" "}
    </>
  );
};

export default Users;
