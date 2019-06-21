const webServiceRoutes = {
  LOGIN: "/login",
  IS_LOGGED_IN: "/media",
  FORGOT_PASSWORD: "/user/forgot-password",
  COUNT: "/user/count",
  ADD_USER: "/user/create",
  USER_LIST_STATUS: "/user/list/status",
  SIGNOUT: "/logout",
  CHANGE_PASSWORD: "/user/change-password",
  APPROVE_USER: "/user/approve/",
  Reject_USER: "/user/reject/",
  USER_DETAIL: "/user/",
  USER_UNITS: "/userUnit/",
  ADD_UNIT: "/userUnit",
  DELETE_UNIT: "/userUnit/",
  UPDATE_USER: "/user/",
  ACTIVATE_USER: "/user/active/",
  DEACTIVATE_USER: "/user/deactive/",
  MUlTI_APPROVE: "/user/multiApprove",
  UPDATE_UNIT: "/userUnit/unitNumber/",
  IMPORT_UNITS: "/userUnit/import",
  IMPORT_LOGS: "/userUnit/importLogs",
  SEARCH_UNITS: "/userUnit/searchUnits"
};
const UIRoutes = {
  LOGIN: "/login",
  DASHBOARD: "/",
  FORGOT_PASSWORD: "/forgotPassword",
  USER_DETAIL: "/user/",
  CHANGE_PASSWORD: "/changePassword"
};

const allowedKeys = [
  8,
  9,
  37,
  39,
  46,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  96,
  97,
  98,
  99,
  100,
  101,
  102,
  103,
  104,
  105
];

const errorFieldMapping = {
  first_name: "First name",
  last_name: "Last name",
  email: "Email",
  telephone: "telephone",
  client: "Client",
  cnpj: "CNPJ",
  unit_number: "Unit number",
  address: "Address",
  distributor: "Distributor",
  password: "Password",
  power_plant: "Power plant",
  group_voltage: "Group Voltage",
  phase: "Phase",
  neighborhood: "Neighborhood"
};

const distributorList = [
  "ENERGISA",
  "LIGHT",
  "ENEL",
  "RGE",
  "CEB",
  "COELBA",
  "CPFL PAULISTA"
];

const phaseList = ["TRIFASICO", "BIFASICO", "MONOFASICO"];

const groupVoltageList = ["B1", "B2", "B3", "B4"];

export {
  webServiceRoutes,
  UIRoutes,
  allowedKeys,
  errorFieldMapping,
  distributorList,
  phaseList,
  groupVoltageList
};
