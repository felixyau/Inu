//now for every upload I just save the picture to the server, even the user abort the register

import { useEffect, useState } from "react";
import React from "react";
import { Box, Circle, Link, Image, Flex, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEditUserProfileMutation } from "../../generated/graphql";
import { useUserContext } from "../../components/UserWrapper";
import router from "next/router";
import withApollo from "../../utilities/withApollo";

export const Icon: React.FC = () => {
  const [photoPreview, setPhotoPreview] = useState({
    src: "https://pyxis.nymag.com/v1/imgs/8f8/e12/51b54d13d65d8ee3773ce32da03e1fa220-dogecoin.rsquare.w1200.jpg",
    alt: "a doggo",
  });
  const [logs, setLogs] = useState("Upload your fav doggo");
  const [editProfile] = useEditUserProfileMutation();
  const result = useUserContext();
  if (!result?.me) return <div>You haven't registered or logged in</div>;
  const userId = result.me.id;
  // const cl = new Cloudinary({ cloud_name: "dkvxmdths" });
  // cl.responsive();

  const uploadWidget = () => {
    const myCropWidget = window.cloudinary
      .createUploadWidget(
        {
          cloudName: "dkvxmdths",
          uploadPreset: "zuznutih",
          folder: "widgetUpload",
          sources: ["local", "url", "camera", "image_search"],
          // googleApiKey:process.env.searchApiKey, //add later
          cropping: true,
          croppingAspectRatio: 1,
          clientAllowedFormats: ["jpg", "jpeg", "png"],
        },
        (error, result) => {
          if (error) console.log("widgeterror:", error);
          if (result.event === "success") {
            console.log("success! info:", result.info);
            setPhotoPreview({
              src: `${result.info.secure_url}`,
              alt: "photo uploaded",
            });
            setLogs("Pick another one");
            editProfile({
              variables: { url: result.info.secure_url, id: userId },
            });
          } else if (result.event === "batch-cancelled")
            console.log("failed, info:", result.info);
        }
      )
      .open();
  };

  return (
    <Flex
      direction="column"
      align="center"
      maxWidth="400px"
      p="16px"
      m="10px auto 0"
    >
      <Box className="card" width="100%" p="16px">
        <Flex direction="column" align="center">
          <Text fontSize="2xl">Choose your Icon</Text>
          <Box m="32px 0">
            <Circle size="60px" bg="white" color="white">
              <Image
                objectFit="cover"
                height="100%"
                width="100%"
                borderRadius="50%"
                src={photoPreview.src}
                alt={photoPreview.alt}
              />
            </Circle>
          </Box>
          <button style={{ color: "#0088cc" }} onClick={() => uploadWidget()}>
            {logs}
          </button>
          <NextLink href="/">
            <a>
              <Button mt="4px" hidden={logs !== "Pick another one"}>
                Looks good to me, let's go
              </Button>
            </a>
          </NextLink>
        </Flex>
      </Box>
      <Box className="card" width="100%" mt="10px" p="10px 0">
        <Flex justify="center" p="15px">
          <Link>
            <button
              onClick={async () => {
                await editProfile({
                  variables: {
                    url: "https://pyxis.nymag.com/v1/imgs/8f8/e12/51b54d13d65d8ee3773ce32da03e1fa220-dogecoin.rsquare.w1200.jpg",
                    id: userId,
                  },
                });
                router.push("/");
              }}
            >
              <Text class="grayFont">Or... I like the default doggo</Text>
            </button>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default withApollo({ ssr: false })(Icon);
