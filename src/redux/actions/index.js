import {
  GET_FUNDS,
  PUT_BASKET,
  DELETE_BASKET,
  GET_BASKETS,
  SET_CURRENT_BASKET,
} from "../constants/actionTypes";

export const updateLoadingAction = () => ({
  type: GET_FUNDS,
});

export const getBasketsAction = () => ({
  type: GET_BASKETS,
});

export const putBasketAction = (payload) => ({
  type: PUT_BASKET,
  payload,
});

export const deleteBasketAction = (payload) => ({
  type: DELETE_BASKET,
  payload,
});

export const setCurrentBasketAction = (payload) => ({
  type: SET_CURRENT_BASKET,
  payload,
});
