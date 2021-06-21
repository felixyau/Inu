import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button
} from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment } from "../generated/graphql";
import Post from "../pages/post/[id]";
import { PostFullPage } from "./PostFullPage";

interface IndexModalProps {
  open:boolean;
  onClose: () => void;
  post: PostSnippetFragment;
}

export const IndexModal: React.FC<IndexModalProps> = ({open, onClose, post}) => {
  return (
    <Modal isOpen={open} onClose={onClose} scrollBehavior="outside" size="4xl" closeOnOverlayClick={true} isCentered={true}>
    <ModalOverlay />
    <ModalContent maxWidth="935px">
      <ModalCloseButton right={0}/>
      <ModalBody p="0">
      <PostFullPage post={post}/>
      </ModalBody>
    </ModalContent>
  </Modal>
  );
};


