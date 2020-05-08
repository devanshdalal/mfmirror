import dbClient from "./cachingClient";

export const getportfolio = (data) => {
  // let options = {
  //   method: "GET",
  //   url: "/getportfolio",
  //   data: data,
  // };
  // return null;
};

export const getfunds = () => {
  let options = {
    method: "SCAN",
    table: "funds",
    cache: true,
  };
  return dbClient(options);
};
