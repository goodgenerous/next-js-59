import {
  Flex,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Text,
  Button,
  Heading,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Login() {
  const toast = useToast();
  const router = useRouter();
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    const response = await mutate({ url: "/api/login", payload });
    if (!response.success) {
      toast({
        title: "Login Failed!",
        description: "Email and password didn't match",
        position: "top",
        status: "error",
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    } else {
      Cookies.set("user_token", response.data.token, {
        expires: new Date(response.data.expires_at),
        path: "/",
      });
      router.push("/");
      toast({
        title: "Login Successfully!",
        position: "top",
        variant: "top-accent",
        status: "success",
        isClosable: true,
      });
      setPayload({
        email: "",
        password: "",
      });
    }
  };

  return (
    <section className="bg-slate-400 min-w-screen min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Card maxW="2xl" padding={5}>
          <CardHeader>
            <Heading size="lg" textAlign="center">
              {" "}
              Login{" "}
            </Heading>{" "}
          </CardHeader>{" "}
          <CardBody>
            <FormControl mb={4}>
              <FormLabel> Email </FormLabel>{" "}
              <InputGroup size="md">
                <Input
                  name="password"
                  placeholder="Enter email"
                  type="text"
                  value={payload.email}
                  onChange={(e) =>
                    setPayload({ ...payload, email: e.target.value })
                  }
                />{" "}
              </InputGroup>{" "}
            </FormControl>{" "}
            <FormControl>
              <FormLabel> Password </FormLabel>{" "}
              <InputGroup size="md">
                <Input
                  name="password"
                  onChange={(e) =>
                    setPayload({ ...payload, password: e.target.value })
                  }
                  value={payload.password}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {" "}
                    {show ? "Hide" : "Show"}{" "}
                  </Button>{" "}
                </InputRightElement>{" "}
              </InputGroup>{" "}
            </FormControl>{" "}
          </CardBody>{" "}
          <Flex justifyContent="center">
            <CardFooter>
              <Button colorScheme="blue" onClick={() => handleSubmit()}>
                {" "}
                Submit{" "}
              </Button>{" "}
            </CardFooter>{" "}
          </Flex>{" "}
        </Card>{" "}
      </div>{" "}
    </section>
  );
}
