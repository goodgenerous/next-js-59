import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));

const Details = () => {
  return (
    <>
      <LayoutComponent
        metaTitle="User - Details"
        metaDescription="Ini merupakan halaman details dari user"
      >
        <p className="text-lg p-4 font-bold"> Halaman User Details </p>{" "}
      </LayoutComponent>{" "}
    </>
  );
};

export default Details;
