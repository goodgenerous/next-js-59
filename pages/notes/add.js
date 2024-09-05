import dynamic from "next/dynamic";
import {
  Flex,
  Card,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function AddNotes() {
  const { mutate, isError } = useMutation();
  const toast = useToast();
  const router = useRouter();
  const [notesData, setNotesData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async () => {
    // try {
    //   const response = await fetch("https://service.pace-unv.cloud/api/notes", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(notesData),
    //   });
    //   const result = await response.json();
    //   console.log(result);
    //   router.push("/notes");
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const response = await mutate({
        url: "https://service.pace-unv.cloud/api/notes",
        payload: notesData,
      });
      console.log("response =>", response);
      if (!isError) {
        toast({
          title: "Data Success Added",
          position: "top",
          variant: "top-accent",
          status: "success",
          isClosable: true,
        });
      }
      router.push("/notes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutComponent
      metaTitle="Add Notes"
      metaDescription="Ini merupakan halaman add notes"
    >
      <Card margin={10}>
        <Flex direction="column" align="start" justify="center" padding={5}>
          <Button colorScheme="red" onClick={() => router.back()} mb={4}>
            Back{" "}
          </Button>{" "}
          <Heading size="lg" mb={4}>
            Add Data{" "}
          </Heading>{" "}
          <FormControl mb={4}>
            <FormLabel> Title </FormLabel>{" "}
            <Input
              type="text"
              onChange={(event) =>
                setNotesData({
                  ...notesData,
                  title: event.target.value,
                })
              }
            />{" "}
          </FormControl>{" "}
          <FormControl>
            <FormLabel> Description </FormLabel>{" "}
            <Textarea
              onChange={(event) =>
                setNotesData({
                  ...notesData,
                  description: event.target.value,
                })
              }
            />{" "}
            <FormHelperText> Fill with notes description </FormHelperText>{" "}
          </FormControl>{" "}
          <Button colorScheme="blue" mt={4} onClick={() => handleSubmit()}>
            Submit{" "}
          </Button>{" "}
        </Flex>{" "}
      </Card>{" "}
    </LayoutComponent>
  );
}
