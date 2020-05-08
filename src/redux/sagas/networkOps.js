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

export function* networkOps(action) {
  switch (action.type) {
    case GET_FUNDS: {
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
      break;
    }
    case GET_BASKETS: {
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
      break;
    }
    case PUT_BASKET:
  }
}

export default function* root() {
  yield all([
    takeLatest([GET_FUNDS, GET_BASKETS, PUT_BASKET, DELETE_BASKET], (action) =>
      networkOps(action)
    ),
  ]);
}
