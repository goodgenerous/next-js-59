import { useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import DummyImage from "@/public/image-1.jpg";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p> Loading... </p>,
  ssr: false,
});

export default function Home() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response => ", res))
      .catch((err) => console.error("error => ", err));
  }, []);

  return (
    <>
      <LayoutComponent
        metaTitle="Home"
        metaDescription="Ini merupakan halaman Home"
      >
        <p className="text-lg p-4 font-bold"> Halaman Home </p>{" "}
        <Image
          src={DummyImage}
          width={400}
          height={400}
          alt="next-logo"
          placeholder="blur"
        />{" "}
      </LayoutComponent>{" "}
    </>
  );
}
