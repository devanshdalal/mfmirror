import { UPDATE_LOADING } from "../constants/action-types";

const initialState = { loadState: false };
const loading = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOADING:
      return { loadState: action.payload };
    default:
      return state;
  }
};

export default loading;
