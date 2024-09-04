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
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function AddNotes() {
  const router = useRouter();
  const [notesData, setNotesData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://service.pace-unv.cloud/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notesData),
      });
      const result = await response.json();
      console.log(result);
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
            <FormHelperText> Fill with product description </FormHelperText>{" "}
          </FormControl>{" "}
          <Button colorScheme="blue" mt={4} onClick={() => handleSubmit()}>
            Submit{" "}
          </Button>{" "}
        </Flex>{" "}
      </Card>{" "}
    </LayoutComponent>
  );
}
