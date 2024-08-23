const Menu = () => {
  return (
    <div className="flex gap-3 text-white">
      <a href="/" className="hover:font-bold">
        Home{" "}
      </a>{" "}
      <a href="/profile" className="hover:font-bold">
        {" "}
        Profile{" "}
      </a>{" "}
    </div>
  );
};

export default Menu;
