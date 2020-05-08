import { all, fork } from "redux-saga/effects";

// import user from "./user";
import networkOps from "./networkOps";

export default function* root() {
  yield all([fork(networkOps)]);
}
