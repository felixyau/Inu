import { Circle, Text, Image } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface UserIconProps {
  size: string;
  align?: string;
  src: string;
  userId: number;

}

export const UserIcon: React.FC<UserIconProps> = ({
  size,
  align,
  src,
  userId,
  ...props
}) => {
  return (
    <NextLink href="/user/[id]" as={`/user/${userId}`}>
      <a>
        <Circle
          size={size}
          bg="white"
          color="white"
          align={align ? align : undefined}
        >
          <Image
            objectFit="cover"
            height="100%"
            width="100%"
            borderRadius="50%"
            src={src}
          />
        </Circle>
      </a>
    </NextLink>
  );
};
