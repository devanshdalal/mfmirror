import { GET_FUNDS, PUT_BASKET, DELETE_BASKET } from "../constants/actionTypes";

export const updateLoadingAction = () => ({
  type: GET_FUNDS,
});

export const putBasketAction = (payload) => ({
  type: PUT_BASKET,
  payload,
});

export const deleteBasketAction = (payload) => ({
  type: DELETE_BASKET,
  payload,
});
