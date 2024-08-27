import Link from "next/link";

const Menu = () => {
  return (
    <div className="flex gap-3 text-white">
      <Link href="/" className="hover:font-bold">
        Home{" "}
      </Link>{" "}
      <Link href="/profile" className="hover:font-bold">
        {" "}
        Profile{" "}
      </Link>{" "}
      <Link href="/users" className="hover:font-bold">
        {" "}
        Users{" "}
      </Link>{" "}
    </div>
  );
};

export default Menu;
