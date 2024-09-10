import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p> Loading... </p>,
  ssr: false,
});

export default function Profile() {
  return (
    <>
      <LayoutComponent
        metaTitle="Profile"
        metaDescription="Ini merupakan halaman profile"
      >
        <p className="text-lg p-4 font-bold"> Halaman Profile </p>{" "}
      </LayoutComponent>{" "}
    </>
  );
}
