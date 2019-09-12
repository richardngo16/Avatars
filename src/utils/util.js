const betaFaceRequest = imageSrc => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      // Free Api Key, Don't need .env
      api_key: "d45fd466-51e2-4701-8da8-04351c872236",
      file_base64: imageSrc.replace("data:image/jpeg;base64,", ""),
      detection_flags: "classifiers,extended"
    })
  };
  return fetch("https://www.betafaceapi.com/api/v2/media", options);
};

export const getFaceData = async imageSrc => {
  try {
    const data = await (await betaFaceRequest(imageSrc)).json();
    return data.media.faces[0].tags;
  } catch (e) {
    console.error(e);
  }
};

// Functions to Map to Sketch Properties
export const mapTopType = apiDataResponse => {
  const wearingHat = apiDataResponse.filter(field => {
    return field.name === "wearing hat";
  })[0];

  if (wearingHat.value === "yes" && wearingHat.confidence > 0.8) {
    return "Hat";
  }

  const noHairCheck = apiDataResponse.filter(field => {
    return field.name === "bald";
  })[0];

  if (noHairCheck.value === "yes" && noHairCheck.confidence >= 0.9) {
    return "NoHair";
  }

  // none, very short, short, average, long, very long
  const hairLength = apiDataResponse.filter(field => {
    return field.name === "hair length";
  })[0].value;

  // very short, short, average, thick, very thick
  const hairTop = apiDataResponse.filter(field => {
    return field.name === "hair top";
  })[0].value;

  switch (hairLength) {
    case "none":
      // already did NoHair This is Sanity Check
      if (hairTop === "very short") {
        return "ShortHairTheCaesar";
      }
      if (hairTop === "short") {
        return "ShortHairRound";
      }
      break;
    case "very short":
      return "ShortHairTheCaesar";
    case "short":
      return "ShortHairRound";
    case "average":
      return "ShortHairShortWaved";
    case "long":
      return "LongHairNotTooLong";
    case "very long":
      return "LongHairStraight";
    default:
      return "ShortHairShortCurly";
  }
};

export const mapHairColor = apiDataResponse => {
  //black, blond, red, brown, brown light, not natural light, not natural
  const hairColor = apiDataResponse.filter(field => {
    return field.name === "hair color type";
  })[0];
  switch (hairColor.value) {
    case "black":
      return "Black";
    case "blond":
      return "Blonde";
    case "brown":
      return "BrownDark";
    case "brown light":
      return "Brown";
    case "red":
      if (hairColor.confidence > 0.8) return "Red";
      break;
    default:
      return "Brown";
  }
};

export const mapGlasses = apiDataResponse => {
  const hasGlasses = apiDataResponse.filter(field => {
    return field.name === "glasses";
  })[0].value;
  return hasGlasses === "yes" ? "Prescription02" : "Blank";
};

export const mapFacialHair = apiDataResponse => {
  //hair beard - none, short, thick
  const hasBeard = apiDataResponse.filter(field => {
    return field.name === "hair beard";
  })[0];

  if ((hasBeard.value !== "none") & (hasBeard.confidence > 0.75)) {
    return "BeardLight";
  }

  const hasMustache = apiDataResponse.filter(field => {
    return field.name === "hair mustache";
  })[0];

  if ((hasMustache.value !== "none") & (hasMustache.confidence > 0.7)) {
    return "MustacheFancy";
  }
  return "Blank";
};

export const mapSkin = apiDataResponse => {
  //race - asian-middle-eastern, asian, african-american, hispanic, white, middle eastern, othe
  const race = apiDataResponse.filter(field => {
    return field.name === "race";
  })[0];
  if (race.value === "white" && race.confidence > 0.9) return "Pale";
  if (race.value === "hispanic" && race.confidence > 0.9) return "Tanned";
  if (race.value === "african-american" && race.confidence > 0.9)
    return "Black";
  return "Light";
};
