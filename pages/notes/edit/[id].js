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
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function EditNotes() {
  const router = useRouter();
  const { id } = router.query;
  const [notesData, setNotesData] = useState();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://service.pace-unv.cloud/api/notes/update/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notesData),
        }
      );
      const result = await response.json();
      if (result) {
        router.push("/notes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
      const listNotes = await res.json();
      setNotesData(listNotes.data);
    }
    fetchingData();
  }, [id]);

  return (
    <LayoutComponent
      metaTitle="Edit Notes"
      metaDescription="Ini merupakan halaman add notes"
    >
      <Card margin={10}>
        <Flex direction="column" align="start" justify="center" padding={5}>
          <Button colorScheme="red" onClick={() => router.back()} mb={4}>
            Back{" "}
          </Button>{" "}
          <Heading size="lg" mb={4}>
            Edit Data{" "}
          </Heading>{" "}
          <FormControl mb={4}>
            <FormLabel> Title </FormLabel>{" "}
            <Input
              type="text"
              value={notesData && notesData.title}
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
              value={notesData && notesData.description}
              onChange={(event) =>
                setNotesData({
                  ...notesData,
                  description: event.target.value,
                })
              }
            />{" "}
            <FormHelperText> Edit the notes description </FormHelperText>{" "}
          </FormControl>{" "}
          <Button colorScheme="blue" mt={4} onClick={() => handleSubmit()}>
            Submit{" "}
          </Button>{" "}
        </Flex>{" "}
      </Card>{" "}
    </LayoutComponent>
  );
}
