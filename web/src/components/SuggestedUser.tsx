import { Box, Flex, Spacer } from '@chakra-ui/react';
import React from 'react'
import { User } from '../generated/graphql';
import { FriendsDesciption } from './FriendsDesciption';

interface SuggestedUserProps {
  user: Pick<User, "id" | "username" | "icon">
}

export const SuggestedUser: React.FC<SuggestedUserProps> = ({user}) => {
        return (
            <Flex direction="column" mt="10px">
                <Flex>
                  <Box>Suggestion</Box>
                  <Spacer/>
                  <Box>Check out all</Box>
                </Flex>
                <FriendsDesciption user={user}/>
            </Flex>
        );
}