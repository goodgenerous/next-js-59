import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p> Loading... </p>,
  ssr: false,
});

export default function Posts({ posts }) {
  console.log("data posts => ", posts);
  return (
    <LayoutComponent
      metaTitle="Posts"
      metaDescription="Ini merupakan halaman posts"
    >
      <div className="p-4">
        {" "}
        {posts.map((item) => (
          <div key={item.id} className="bg-gray-200 p-4 m-4 rounded-lg">
            <p className="text-sm font-bold"> Id: {item.id} </p>{" "}
            <p className="text-sm"> Title: {item.title} </p>{" "}
            <p className="text-sm"> Body: {item.body} </p>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </LayoutComponent>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return { props: { posts } };
}
