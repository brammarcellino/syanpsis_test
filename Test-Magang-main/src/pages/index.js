import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  VStack,
  useToast,
  useCallbackRef,
} from "@chakra-ui/react";
import Header from "../components/header";
import api from "../services/api";

export default function Home() {
  const [user_Id, setuser_id] = useState("");
  const [full_name, setfull_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState(null);
  const [clients, setClients] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidFormData = () => {
    if (!user_Id) {
      return toast({
        title: "harap isi ID anda",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (!full_name) {
      return toast({
        title: "harap isi nama lengkap anda!!!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (!last_name) {
      return toast({
        title: "harap isi nama terakhir  anda!!!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (!email) {
      return toast({
        title: "harap isi kan alamat email anda!!!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (!phone) {
      return toast({
        title: "harap isi kan nomor telfon anda!!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (!address) {
      return toast({
        title: "harap isi kan alamat anda!!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (clients.some((client) => client.email === email && client._id !== id)) {
      return toast({
        title: "tidak dapat menemukan alamat email!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmitCreateClient = async (e) => {
    e.preventDefault();

    if (isValidFormData()) return;
    try {
      setIsLoading(true);
      const { data } = await api.post("/clients", { user_Id, full_name, last_name, email, phone, address });
      setClients(clients.concat(data.data));
      setuser_id("");
      setfull_name("");
      setlast_name("");
      setEmail("");
      setPhone("");
      setAddress("");
      setIsFormOpen(!isFormOpen);
      toast({
        title: "pendaftaran berhasil!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      api.get("/clients").then(({ data }) => {
        setClients(data.data);
      })
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async (_id) => {
    try {
      await api.delete(`clients/${_id}`);
      api.get("/clients").then(({ data }) => {
        setClients(data.data);
      })
      toast({
        title: "hapus data berhasil!",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  const handlShowUpdateClient = (client) => {
    setId(client._id);
    setuser_id(client.user_Id);
    setfull_name(client.full_name);
    setlast_name(client.last_name);
    setEmail(client.email);
    setPhone(client.phone);
    setAddress(client.address);
    setIsFormOpen(true);
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();

    if (isValidFormData()) return;

    try {
      setIsLoading(true);
      await api.put(`clients/${id}`, { user_Id, full_name, last_name, email, phone, address });
      setuser_id("");
      setfull_name("");
      setlast_name("");
      setEmail("");
      setPhone("");
      setAddress("");
      setId(null);
      setIsFormOpen(!isFormOpen);

      toast({
        title: "Update Success!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      api.get("/clients").then(({ data }) => {
        setClients(data.data);
      })
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const toast = useToast();
  
  useEffect(() => {
    [
      api.get("/clients").then(({ data }) => {
        setClients(data.data);
      }),
    ];
  }, [clients.whenToUpdateValue]);

  return (
    <Box>
      <Header />
      <Flex align="center" justifyContent="center">
        <Box
          width={900}
          borderWidth={1}
          borderRadius={9}
          boxShadow="lg"
          p={30}
          mt="35"
        >
          <Flex justifyContent="flex-end">
            <Button
              colorScheme="blue"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              {isFormOpen ? "-" : "+"}
            </Button>
          </Flex>

          {isFormOpen ? (
            <VStack
              as="form"
              onSubmit={id ? handleUpdateClient : handleSubmitCreateClient}
            >
              <FormControl>
                <FormLabel> user_ID</FormLabel>
                <Input
                  type="text"
                  placeholder="masukkan nomor id"
                  onChange={(e) => setuser_id(e.target.value)}
                  value={user_Id}
                />
              </FormControl>

              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  placeholder="masukkan First Name"
                  onChange={(e) => setfull_name(e.target.value)}
                  value={full_name}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  placeholder="masukkan Last Name"
                  onChange={(e) => setlast_name(e.target.value)}
                  value={last_name}
                />
              </FormControl>

              <FormControl mt={5}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="masukkan E-mail"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="number"
                  placeholder="masukkan nomor telPhone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  placeholder="masukkan alamat"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </FormControl>

              <Button
                colorScheme="green"
                type="submit"
                mt={6}
                isLoading={isLoading}
              >
                {id ? "Update" : "Register"}
              </Button>
            </VStack>
          ) : null}

          <Table variant="simple" mt={6}>
            <Thead bgColor="green">
              <Tr>
                <Th textColor="white">user_ID</Th>
                <Th textColor="white">First Name</Th>
                <Th textColor="white">Email</Th>
                <Th textColor="white">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients.map((client, index) => (
                <Tr key={index}>
                  <Td>{client.user_Id}</Td>
                  <Td>{client.full_name}</Td>
                  <Td>{client.email}</Td>
                  <Td justifyContent="space-between">
                    <Flex>
                      <Button
                        size="sm"
                        fontSize="small"
                        colorScheme="yellow"
                        mr="2"
                        onClick={() => handlShowUpdateClient(client)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        fontSize="small"
                        colorScheme="red"
                        mr="2"
                        onClick={() => handleDeleteClient(client._id)}
                      >
                        hapus
     </Button>
                    </Flex>
       </Td>
                </Tr>
              ))}
 </Tbody>
                   </Table>
 </Box>
      </Flex>
    </Box>
  );
}
