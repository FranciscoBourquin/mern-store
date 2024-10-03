import { Box, Button, Heading, HStack, IconButton, Image, Input, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import { useProductStore } from "../store/product";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useState } from "react";

export const ProductCard = ({ product,  }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product)

  const textColor =useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteProduct } = useProductStore();
  const toast = useToast();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const { updateProduct } = useProductStore()
  const handleUpdate = async (pid) => {
    const { success, message } = await updateProduct(pid, updatedProduct);

    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      onClose();
    }
  };

  return (
    <Box
    bg={bg}
    shadow={"lg"}
    rounded={"lg"}
    overflow={"hidden"}
    transition={"all 0.3s"}
    _hover={{transform: "translateY(-5px)", shadow: "xl"}}
    >
      <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"}/>

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}

        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          {product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon/>} colorScheme="blue" onClick={onOpen}/>
          <IconButton icon={<DeleteIcon/>} colorScheme="red" onClick={()=>handleDeleteProduct(product._id)}/>
        </HStack>

      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>

        <ModalContent>
          <ModalHeader>
            Update Product
          </ModalHeader>

        <ModalCloseButton/>

        <ModalBody>

          <VStack>

            <Input placeholder="Product Name" name="name" value={updatedProduct.name} onChange={(e)=> setUpdatedProduct({...updatedProduct, name: e.target.value})}/>

            <Input placeholder="Price" name="price" type="number" value={updatedProduct.price} onChange={(e)=> setUpdatedProduct({...updatedProduct, price: e.target.value})}/>

            <Input placeholder="Image URL" name="image" value={updatedProduct.image} onChange={(e)=> setUpdatedProduct({...updatedProduct, image: e.target.value})}/>

          </VStack>

        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={()=>handleUpdate(product._id, updatedProduct)}> Update</Button>
          <Button variant={"ghost"} onClick={onClose}> Close</Button>
        </ModalFooter>

        </ModalContent>

      </Modal>

    </Box>
    )
}
