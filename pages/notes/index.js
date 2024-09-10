import dynamic from "next/dynamic";
import {
  Flex,
  Grid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  ButtonGroup,
  Text,
  GridItem,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetcher";
// import { useQueries } from "@/hooks/useQueries";
// import { useMutation } from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import("@/layout"), {
  loading: () => <p> Loading... </p>,
  ssr: false,
});

export default function Notes() {
  const toast = useToast();
  const { data, isLoading } = useSWR(
    "https://service.pace-unv.cloud/api/notes",
    fetcher,
    { revalidateOnFocus: true }
  );
  const router = useRouter();
  // const { mutate, isError } = useMutation();
  // const { data, isLoading } = useQueries({
  //   prefixUrl: "https://service.pace-unv.cloud/api/notes",
  // });

  const handleDelete = async (id) => {
    // Tanpa menggunakan hooks
    // try {
    //   const response = await fetch(
    //     `https://service.pace-unv.cloud/api/notes/delete/${id}`,
    //     {
    //       method: "DELETE",
    //     }
    //   );
    //   const result = await response.json();
    //   if (result) {
    //     router.reload();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // Menggunakan custom hooks
    // try {
    //   const response = await mutate({
    //     url: `https://service.pace-unv.cloud/api/notes/delete/${id}`,
    //     method: "DELETE",
    //   });
    //   if (!isError) {
    //     toast({
    //       title: "Data Success Deleted",
    //       position: "top",
    //       variant: "top-accent",
    //       status: "warning",
    //       isClosable: true,
    //     });
    //   }
    //   router.reload();
    // } catch (err) {
    //   console.log(err);
    // }
    // Menggunakan hooks dari SWR
    try {
      const url = `https://service.pace-unv.cloud/api/notes/delete/${id}`;
      const response = await mutate(
        url,
        async () => {
          const result = await fetch(url, {
            method: "DELETE",
          });
          if (!result.ok) return result.json();
        },
        { refreshInterval: 1000 }
      );
      console.log(response);
      toast({
        title: "Data Success Deleted",
        position: "top",
        variant: "top-accent",
        status: "warning",
        isClosable: true,
      });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Menggunakan useEffect untuk fetching data
  // const [notesData, setNotesData] = useState();
  // useEffect(() => {
  //   async function fetchingData() {
  //     const res = await fetch("https://service.pace-unv.cloud/api/notes");
  //     const listNotes = await res.json();
  //     setNotesData(listNotes);
  //   }
  //   fetchingData();
  // }, []);
  // console.log("List Notes => ", notesData);

  return (
    <LayoutComponent
      metaTitle="List Notes"
      metaDescription="Ini merupakan halaman list notes"
    >
      <Flex className="justify-center p-4">
        <Button colorScheme="green" onClick={() => router.push("/notes/add")}>
          Add Data{" "}
        </Button>{" "}
      </Flex>{" "}
      {isLoading ? (
        <Flex justify="center" align="center" h="50vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <>
          <Flex className="justify-center p-4">
            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              {" "}
              {data &&
                data.data.map((item) => (
                  <GridItem key={item.id}>
                    <Card maxW="sm">
                      <CardHeader>
                        <Heading size="md"> {item.title} </Heading>{" "}
                      </CardHeader>{" "}
                      <CardBody>
                        <Text> {item.description} </Text>{" "}
                      </CardBody>{" "}
                      <CardFooter>
                        <ButtonGroup spacing="2">
                          <Button
                            onClick={() =>
                              router.push(`/notes/edit/${item.id}`)
                            }
                            variant="solid"
                            colorScheme="blue"
                          >
                            Edit{" "}
                          </Button>{" "}
                          <Button
                            onClick={() => handleDelete(item.id)}
                            variant="solid"
                            colorScheme="red"
                          >
                            Delete{" "}
                          </Button>{" "}
                          <Button
                            onClick={() => router.push(`/notes/${item.id}`)}
                            variant="solid"
                            colorScheme="yellow"
                          >
                            Details{" "}
                          </Button>{" "}
                        </ButtonGroup>{" "}
                      </CardFooter>{" "}
                    </Card>{" "}
                  </GridItem>
                ))}{" "}
            </Grid>{" "}
          </Flex>{" "}
        </>
      )}{" "}
    </LayoutComponent>
  );
}
