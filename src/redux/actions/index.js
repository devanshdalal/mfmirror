import { UPDATE_LOADING } from "../constants/action-types";

export const updateLoadingAction = loading => ({
  type: UPDATE_LOADING,
  payload: loading
});
