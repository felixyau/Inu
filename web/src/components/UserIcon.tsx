import { Circle, Text } from "@chakra-ui/react";
import React from "react";

interface UserIconProps {
    size: string;
}

export const UserIcon: React.FC<UserIconProps> = ({size}) => {
  return (
    <Circle size={size} bg="white" color="white">
      <Text fontSize="10px" color="black">
        Image
      </Text>
    </Circle>
  );
};
