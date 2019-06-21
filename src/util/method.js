import { WebServiceRequest } from "./webRequest";
import { webServiceRoutes } from "../config/constants";
export const isLoggedIn = () => {
  let options = {
    method: "POST",
    url: webServiceRoutes.IS_LOGGED_IN,
    data: { mmananan: "agsghasghaghs" }
  };
  return WebServiceRequest.callWebService(options);
};

const EMAIL_PATTERN = /^[a-zA-Z0-9._-|+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const VALIDATE_EMAIL = email => {
  return EMAIL_PATTERN.test(email);
};

export const formatPhone = phoneNumber => {
  var numbers = phoneNumber.replace(/\D/g, ""),
    char = { 0: "(", 2: ") ", 7: "-" };
  phoneNumber = "";
  for (var i = 0; i < numbers.length; i++) {
    phoneNumber += (char[i] || "") + numbers[i];
  }

  return phoneNumber;
};
