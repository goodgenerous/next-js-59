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
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
// import { useMutation } from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function EditNotes() {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();
  const [data, setData] = useState();
  // const { mutate, isError } = useMutation();

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
      const listNotes = await res.json();
      setData(listNotes.data);
    }
    fetchingData();
  }, [id]);

  const handleSubmit = async () => {
    // Tanpa menggunakan hooks
    // try {
    //   const response = await fetch(
    //     `https://service.pace-unv.cloud/api/notes/update/${id}`,
    //     {
    //       method: "PATCH",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(notesData),
    //     }
    //   );
    //   const result = await response.json();
    //   if (result) {
    //     router.push("/notes");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // Menggunakan Custom Hooks
    // try {
    //   const response = await mutate({
    //     url: `https://service.pace-unv.cloud/api/notes/update/${id}`,
    //     method: "PATCH",
    //     payload: data,
    //   });
    //   console.log("response =>", response);
    //   if (!isError) {
    //     toast({
    //       title: "Data Success Edited",
    //       position: "top",
    //       variant: "top-accent",
    //       status: "success",
    //       isClosable: true,
    //     });
    //   }
    //   router.push("/notes");
    // } catch (error) {
    //   console.log(error);
    // }
    // Menggunakan hooks dari SWR
    try {
      const url = `https://service.pace-unv.cloud/api/notes/update/${id}`;
      const response = await mutate(
        url,
        async () => {
          const result = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (!result.ok) return result.json();
        },
        { revalidate: true }
      );
      console.log(response);
      toast({
        title: "Data Success Edited",
        position: "top",
        variant: "top-accent",
        status: "success",
        isClosable: true,
      });
      router.push("/notes");
    } catch (error) {
      console.log(error);
    }
  };

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
              value={data && data.title}
              onChange={(event) =>
                setData({
                  ...data,
                  title: event.target.value,
                })
              }
            />{" "}
          </FormControl>{" "}
          <FormControl>
            <FormLabel> Description </FormLabel>{" "}
            <Textarea
              value={data && data.description}
              onChange={(event) =>
                setData({
                  ...data,
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
