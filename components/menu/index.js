import { useMutation } from "@/hooks/useMutation";
import { useQueries } from "@/hooks/useQueries";
import { Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

const Menu = () => {
  const userData = useContext(UserContext);
  const router = useRouter();
  const { mutate } = useMutation();
  console.log("userdata =>", userData);
  const API_URL = process.env.NEXT_PUBLIC_URL_API;

  const handleLogout = async () => {
    const response = await mutate({
      url: `${API_URL}/logout`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    Cookies.remove("user_token");
    router.push("/login");
  };

  return (
    <div className="flex justify-between text-white">
      <div className="flex gap-5">
        <Link href="/" className="hover:font-bold">
          Home{" "}
        </Link>{" "}
        <Link href="/profile" className="hover:font-bold">
          Profile{" "}
        </Link>{" "}
        <Link href="/users" className="hover:font-bold">
          Users{" "}
        </Link>{" "}
        <Link href="/notes" className="hover:font-bold">
          Notes{" "}
        </Link>{" "}
        <Link href="/posts" className="hover:font-bold">
          Posts{" "}
        </Link>{" "}
      </div>{" "}
      <div className="flex gap-3">
        {" "}
        <Text className="bg-green-400 px-2 rounded-lg">
          {" "}
          Hello {userData && userData.name}{" "}
        </Text>{" "}
        {!Cookies.get("user_token") ? (
          <Link href="/login" className="hover:font-bold">
            Login{" "}
          </Link>
        ) : (
          <Link
            href="/login"
            onClick={() => handleLogout()}
            className="hover:font-bold"
          >
            Logout{" "}
          </Link>
        )}{" "}
      </div>{" "}
    </div>
  );
};

export default Menu;
