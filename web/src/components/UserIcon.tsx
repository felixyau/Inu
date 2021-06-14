import { Circle, Text, Image } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

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
    <NextLink href="/user/[id]" as={`/user/${1}`}>
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
            src="https://pyxis.nymag.com/v1/imgs/8f8/e12/51b54d13d65d8ee3773ce32da03e1fa220-dogecoin.rsquare.w1200.jpg"
          />
        </Circle>
      </a>
    </NextLink>
  );
};
