//now for every upload I just save the picture to the server, even the user abort the register

import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";
import { useEffect, useState } from "react";
import React from "react";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Cloudinary } from "cloudinary-core";

export const CloudWidget = ({ setValues, values }) => {
  const [photoPreview, setPhotoPreview] = useState({
    src: "https://i.stack.imgur.com/y9DpT.jpg",
    alt: "",
  });
  // const cl = new Cloudinary({ cloud_name: "dkvxmdths" });
  // cl.responsive();

  const createUploadWidget = () => {
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
            setValues({ ...values, photo: `${result.info.secure_url}` });
          } else if (result.event === "batch-cancelled")
            console.log("failed, info:", result.info);
        }
      )
      .open();
  };

  return (
    <Box>
      <Box width="100%" minHeight="120px" border="1px" mt="24px">
        <Image
          width="100%"
          objectfit="cover"
          alt={photoPreview.alt}
          src={photoPreview.src}
        ></Image>

        {/*<Image
          cloudName="dkvxmdths"
          publicId="widgetUpload/psgk79fxqnmqfyni7cdv"
        />
        <img style={{maxHeight:"100%", objectFit:"cover"}} className="cld-responsive" data-src="https://res.cloudinary.com/dkvxmdths/image/upload/w_auto,c_scale/v1623403671/widgetUpload/psgk79fxqnmqfyni7cdv.jpg"></img>
        */}
      </Box>
      <Flex mt="10px" justify="center">
        <Button
          p="5px 2px"
          size="auto"
          colorScheme="blackAlpha"
          onClick={() => createUploadWidget()}
        >
          upload an image
        </Button>
      </Flex>
    </Box>
  );
};
