import Layout from "@/layout";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response => ", res))
      .catch((err) => console.error("error => ", err));
  }, []);

  return (
    <>
      <Layout metaTitle="Home" metaDescription="Ini merupakan halaman Home">
        <p className="text-lg p-4 font-bold"> Halaman Home </p>{" "}
      </Layout>{" "}
    </>
  );
}
