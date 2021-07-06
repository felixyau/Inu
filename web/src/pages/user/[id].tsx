import { useRouter } from "next/router";
import React from "react";
import { CloudWidget } from "../../components/CloudWidget";
import { UserIcon } from "../../components/UserIcon";
import {
  useEditUserProfileMutation,
  usePostQuery,
} from "../../generated/graphql";
import { getUserFromUrl } from "../../utilities/getUserFromUrl";
import withApollo from "../../utilities/withApollo";
import { ProfileWidget } from "../../components/ProfileWidget";
import { Layout } from "../../components/Layout";
import {
  Box,
  Button,
  Circle,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { PostFullPage } from "../../components/PostFullPage";
import { useUserContext } from "../../components/UserWrapper";

const UserProfile: React.FC = ({}) => {
  const { data, loading, error } = getUserFromUrl();
  const [editProfile] = useEditUserProfileMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const result = useUserContext();

  if (error) return <div>Query failed. Reason: {error}</div>;
  if (loading) return <div>loading...</div>;
  if (!data) return <div>User doesn't exist or Page no longer exists</div>;

  const profile = data.userProfile;

  return (
    <Layout>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="outside"
        size="4xl"
        closeOnOverlayClick={true}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent maxWidth="500px">
          <ModalCloseButton right={0}/>
          <ModalBody p="0">
            <Flex direction="column">
            <Text borderBottom="1px solid rgba(238,238,238,1)" textAlign="center" p="8px 0">report this user</Text>
            <Text borderBottom="1px solid rgba(238,238,238,1)" textAlign="center" p="8px 0">block this user</Text>
            {result?.me?.id===profile.id ? <ProfileWidget editProfile={editProfile} userId={profile.id}/>: null}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex justify="center">
        <Flex p="30px 20px" width="95%" maxWidth="935px">
          <Flex mr="30px" width="30%" align="center" direction="column">
            <UserIcon size="150px" src={profile.icon} userId={profile.id} />
          </Flex>
          <Flex direction="column">
            <Flex align="center">
              <Text fontSize="4xl" fontWeight="300">
                {profile.username}
              </Text>
              <Tooltip label="to be implmented">
                <Button
                  ml="20px"
                  size="auto"
                  p="10px 5px"
                  colorScheme="telegram"
                >
                  Follow
                </Button>
              </Tooltip>
              <Flex ml="16px" _hover={{ cursor: "pointer" }} align="center">
                <button style={{height:"100%"}} onClick={onOpen}>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: false })(UserProfile);
