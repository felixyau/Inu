import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";
import { useEffect, useState } from "react";
import React from "react";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import { v4 as uuidv4 } from "uuid";
import { Box,Text } from "@chakra-ui/react";
import { Cloudinary } from "cloudinary-core";

export const ProfileWidget = ({editProfile, userId}) => {
  const [photoPreview, setPhotoPreview] = useState({ src: "", alt: "" });

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
            editProfile({variables:{url:result.info.secure_url, id:userId}, update:(cache) => {cache.evict({ id: `User:${userId}`, fieldName: 'icon' }); cache.gc();}});
          } else if (result.event === "batch-cancelled")
            console.log("failed, info:", result.info);
        }
      )
      .open();
  };

  return (
    <Text textAlign="center" p="8px 0">
      <button onClick={() => createUploadWidget()}>Change profile Picture</button>
    </Text>
  );
};