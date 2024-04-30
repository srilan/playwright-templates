// testing details for login
export const loginDetails = {
  username: "",
  password: "",
};

// testing for text input for station
export const stationDetails = {
  lng: "14.600860367855892",
  lat: "121.01646423339845",
  stationName: "San Juan",
  shortName: "SJ",
};

export const updatedStationDetails = {
  lng: "14.606674408363373",
  lat: "121.02624893188478",
  stationName: "San Juan Station",
  shortName: "sj",
};

export const invalidStationDetails = {
  lng: "longtitude",
  lat: "latitude",
  stationName: "San Juan",
  shortName: "SJ",
};

export const invalidUpdatedStationDetails = {
  lng: "longtitude",
  lat: "latitude",
  stationName: "San Juan Station",
  shortName: "sj",
};

// testing for text input for card
export const validCardDetails = {
  uuid: "5991641473297997",
  balance: "1000",

};

export const invalidCardDetails = {
  uuid: "1231231231",
  balance: "0",
};

export const transactCardDetails = {

  uuid: "1231231231231230",
  startingStation: "Kamuning Station",
  endingStation: "Boni Station",
  startingBalance: "6847",
  totalDistance: "7.40",
  totalCharge: "383",
  newBalance: "6464",
};
