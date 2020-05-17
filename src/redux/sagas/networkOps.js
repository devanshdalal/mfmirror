import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  GET_FUNDS_SUCCESS,
  GET_BASKETS,
  GET_FUNDS,
  PUT_BASKET,
  DELETE_BASKET,
  GET_BASKETS_SUCCESS,
  PUT_BASKET_SUCCESS,
  UPDATE_BASKET_SUCCESS,
  DELETE_BASKET_SUCCESS,
} from "../constants/actionTypes";
import get from "lodash/get";
import assert from "assert";
import dbClient from "../../util/cachingClient";

export const getBaskets = (state) => state.baskets;
export const getBasketsToName = (state) => state.basketsToName;

export function* GetFundsOp() {
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

export function* GetBasketsOp() {
  // GET_BASKETS
  const areBasketsStale = localStorage.getItem("areBasketsStale");

  const options = {
    method: "SCAN",
    table: "baskets",
    cache: areBasketsStale ? false : true,
  };
  const res = yield call(dbClient, options);
  yield put({
    type: GET_BASKETS_SUCCESS,
    payload: res,
  });
}

export function* PutBasketOp(action) {
  // PUT_BASKET
  const { name, schemes } = action.payload;
  const baskets = yield select(getBaskets); // <-- get the baskets
  console.log("put", baskets);
  if (name in baskets) {
    if (baskets[name].permanent) {
      action.payload["name"] = name + " ( 1 )";
    }
  }

  const basketsToName = yield select(getBasketsToName);
  const key = JSON.stringify(schemes);
  // console.log("key", key, "basketsToName", basketsToName, "schemes", schemes);
  let options = {
    table: "baskets",
    item: action.payload,
    cache: true,
  };
  if (key in basketsToName) {
    const oldName = basketsToName[key];
    if (!get(baskets[oldName], "permanent")) {
      console.log("deleting the item by key", oldName);
      options.method = "DELETE";
      options.name = oldName;
      const res = yield call(dbClient, options);
      console.log("res", res);
      yield put({
        type: DELETE_BASKET_SUCCESS,
        payload: oldName,
      });
    }
  }
  options.method = "PUT";
  const res = yield call(dbClient, options);
  console.log("res", res);
  yield put({
    type: PUT_BASKET_SUCCESS,
    payload: action.payload,
  });
}

export function* DeleteBasketOp(action) {
  // DELETE_BASKET
  const name = action.payload;
  const baskets = yield select(getBaskets); // <-- get the baskets
  assert(name in baskets);
  if (baskets[name].permanent) {
    return;
  } else {
    action["permanent"] = false;
  }
  const options = {
    method: "DELETE",
    table: "baskets",
    cache: true,
    name: action.payload,
  };
  const res = yield call(dbClient, options);
  yield put({
    type: DELETE_BASKET_SUCCESS,
    payload: action.payload,
  });
}

export default function* root() {
  yield all([
    takeLatest([GET_FUNDS], () => GetFundsOp()),
    takeLatest([GET_BASKETS], () => GetBasketsOp()),
    takeLatest([PUT_BASKET], (action) => PutBasketOp(action)),
    takeLatest([DELETE_BASKET], (action) => DeleteBasketOp(action)),
  ]);
}
