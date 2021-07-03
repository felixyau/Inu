import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";
import { useEffect, useState } from "react";
import React from "react";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@chakra-ui/react";
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
    <Box>
      <button onClick={() => createUploadWidget()}>upload image</button>
      <Box width="100px" height="120px">
        <img alt={photoPreview.alt} src={photoPreview.src}></img>
        {/*<Image
          cloudName="dkvxmdths"
          publicId="widgetUpload/psgk79fxqnmqfyni7cdv"
        />
        <img style={{maxHeight:"100%", objectFit:"cover"}} className="cld-responsive" data-src="https://res.cloudinary.com/dkvxmdths/image/upload/w_auto,c_scale/v1623403671/widgetUpload/psgk79fxqnmqfyni7cdv.jpg"></img>
        */}
      </Box>
    </Box>
  );
};