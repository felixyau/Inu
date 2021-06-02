import { Box, Flex, Spacer } from '@chakra-ui/react';
import React from 'react'
import { FriendsDesciption } from './FriendsDesciption';

interface SuggestedUserProps {

}

export const SuggestedUser: React.FC<SuggestedUserProps> = ({}) => {
        return (
            <Flex direction="column" mt="10px">
                <Flex>
                  <Box>Suggestion</Box>
                  <Spacer/>
                  <Box>Check out all</Box>
                </Flex>
                <FriendsDesciption/>
                
            </Flex>
        );
}