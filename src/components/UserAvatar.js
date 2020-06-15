import React from "react";
import Avatar from "avataaars";
import {
  mapTopType,
  mapHairColor,
  mapGlasses,
  mapFacialHair,
} from "../utils/util";

const UserAvatar = (props) => {
  const { apiResponseData, screenshot } = props;
  return (
    <div>
      <h1> Avatar </h1>
      <Avatar
        avatarStyle="Circle"
        topType={mapTopType(apiResponseData)}
        hairColor={mapHairColor(apiResponseData)}
        accessoriesType={mapGlasses(apiResponseData)}
        facialHairType={mapFacialHair(apiResponseData)}
        clotheType="Hoodie"
        clotheColor="Black"
        eyeType="Default"
        eyebrowType="Default"
      />
      <div>
        <h1> Original </h1>
        <img
          style={{ height: "300px", width: "350px" }}
          src={screenshot}
          alt="Original"
        />
      </div>
    </div>
  );
};

export default UserAvatar;
