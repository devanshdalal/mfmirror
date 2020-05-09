import {
  GET_FUNDS_SUCCESS,
  GET_BASKETS_SUCCESS,
  PUT_BASKET,
  DELETE_BASKET,
  SET_CURRENT_BASKET,
} from "../constants/actionTypes";

import omit from "lodash/omit";

const initialState = { funds: {}, baskets: {} };

const makeNamedState = (table) => {
  let mapped = {};
  table.Items.forEach((e) => {
    mapped[e.name] = omit(e, "name");
  });
  return mapped;
};

const loadingReducer = (state = initialState, action) => {
  console.log("loadingReducer", action);
  switch (action.type) {
    case GET_FUNDS_SUCCESS:
      return { ...state, funds: makeNamedState(action.payload) };
    case GET_BASKETS_SUCCESS:
      return { ...state, baskets: makeNamedState(action.payload) };
    case PUT_BASKET:
      const { name, schemes } = action.payload;
      console.log("schemes", schemes);
      // state.baskets[name] = schemes
      // return { baskets: {...baskets, {name: schemes}} };
      return Object.assign({}, state, {
        baskets: { ...state.baskets, [name]: schemes },
      });
    case DELETE_BASKET:
      return Object.assign({}, state, {
        baskets: omit(state.baskets, action.payload),
      });
    case SET_CURRENT_BASKET:
      return { ...state, currentBasket: action.payload };
    default:
      return state;
  }
};

export default loadingReducer;
