import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  GET_FUNDS_SUCCESS,
  GET_BASKETS,
  GET_FUNDS,
  PUT_BASKET,
  DELETE_BASKET,
  GET_BASKETS_SUCCESS,
} from "../constants/actionTypes";
import get from "lodash/get";
import dbClient from "../../util/cachingClient";

export function* networkOps1() {
  // GET_FUNDS
  const options = {
    method: "SCAN",
    table: "funds",
    cache: true,
  };
  const res = yield call(dbClient, options);
  yield put({
    type: GET_FUNDS_SUCCESS,
    payload: res,
  });
}

export function* networkOps2() {
  // GET_BASKETS
  const options = {
    method: "SCAN",
    table: "baskets",
    cache: true,
  };
  const res = yield call(dbClient, options);
  yield put({
    type: GET_BASKETS_SUCCESS,
    payload: res,
  });
}

export function* networkOps3(action) {
  // PUT_BASKET
  console.log("put", action);
  const options = {
    method: "PUT",
    table: "baskets",
    item: action.payload,
    cache: true,
  };
  const res = yield call(dbClient, options);
  console.log("res", res);
}

export function* networkOps4(action) {
  // DELETE_BASKET
  const options = {
    method: "DELETE",
    table: "baskets",
    cache: true,
    name: action.payload,
  };
  const res = yield call(dbClient, options);
  console.log("res111", res);
}

export default function* root() {
  yield all([
    takeLatest([GET_FUNDS], () => networkOps1()),
    takeLatest([GET_BASKETS], () => networkOps2()),
    takeLatest([PUT_BASKET], (action) => networkOps3(action)),
    takeLatest([DELETE_BASKET], (action) => networkOps4(action)),
  ]);
}
