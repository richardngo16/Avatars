import React from "react";
import Avatar from "avataaars";
import {
  mapTopType,
  mapHairColor,
  mapGlasses,
  mapFacialHair,
  mapSkin
} from "../utils/util";

const UserAvatar = props => {
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
        Skin={mapSkin(apiResponseData)}
      />
      <div>
        <h1> Original </h1>
        <img src={screenshot} alt="Original" />
      </div>
    </div>
  );
};

export default UserAvatar;
