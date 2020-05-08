import {
  GET_FUNDS_SUCCESS,
  GET_BASKETS_SUCCESS,
  PUT_BASKET,
  DELETE_BASKET,
} from "../constants/actionTypes";

import omit from "lodash/omit";

const initialState = { funds: {} };

const makeFundsState = (funds_table) => {
  let funds = {};
  let suggestionBoxData = [];
  funds_table.Items.forEach((e) => {
    funds[e.name] = { portfolio: e.portfolio, update_time: e.update_time };
    suggestionBoxData.push(e.name);
  });
  return { funds, suggestionBoxData };
};

const loadingReducer = (state = initialState, action) => {
  console.log("loadingReducer", action);
  switch (action.type) {
    case GET_FUNDS_SUCCESS:
      return makeFundsState(action.payload);
    case GET_BASKETS_SUCCESS:
      return { baskets: action.payload.Items };
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
    default:
      return state;
  }
};

export default loadingReducer;
