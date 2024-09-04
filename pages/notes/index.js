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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
  const router = useRouter();
  const [notesData, setNotesData] = useState();
  useEffect(() => {
    async function fetchingData() {
      const res = await fetch("https://service.pace-unv.cloud/api/notes");
      const listNotes = await res.json();
      setNotesData(listNotes);
    }
    fetchingData();
  }, []);

  console.log("List Notes => ", notesData);

  return (
    <LayoutComponent
      metaTitle="List Notes"
      metaDescription="Ini merupakan halaman list notes"
    >
      <Flex className="justify-center p-4">
        <Button colorScheme="blue" onClick={() => router.push("/notes/add")}>
          Add Products{" "}
        </Button>{" "}
      </Flex>{" "}
      <Flex className="justify-center p-4">
        <Grid templateColumns="repeat(3, 1fr)" gap={5}>
          {" "}
          {notesData.data.map((item) => (
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
                    <Button variant="solid" colorScheme="blue">
                      Edit{" "}
                    </Button>{" "}
                    <Button variant="solid" colorScheme="red">
                      Delete{" "}
                    </Button>{" "}
                  </ButtonGroup>{" "}
                </CardFooter>{" "}
              </Card>{" "}
            </GridItem>
          ))}{" "}
        </Grid>{" "}
      </Flex>{" "}
    </LayoutComponent>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://dummyjson.com/users");
//   const users = await res.json();
//   return {
//     props: {
//       users,
//     },
//     revalidate: 10,
//   };
// }
