import { Circle, Text } from "@chakra-ui/react";
import React from "react";

interface UserIconProps {
  size: string;
  align?: string;
}

export const UserIcon: React.FC<UserIconProps> = ({
  size,
  align,
  ...props
}) => {
  return (
    <Circle
      size={size}
      bg="white"
      color="white"
      align={align ? align : undefined}
    >
      <Text fontSize="10px" color="black">
        Image
      </Text>
    </Circle>
  );
};
