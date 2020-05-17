import {
  GET_FUNDS_SUCCESS,
  GET_BASKETS_SUCCESS,
  PUT_BASKET,
  PUT_BASKET_SUCCESS,
  DELETE_BASKET,
  SET_CURRENT_BASKET,
  DELETE_BASKET_SUCCESS,
} from "../constants/actionTypes";

import omit from "lodash/omit";

const initialState = {
  funds: {},
  baskets: {},
  currentBasket: "",
  basketsToName: {},
};

const makeNamedState = (table) => {
  let mapped = {};
  table.Items.forEach((e) => {
    mapped[e.name] = omit(e, "name");
  });
  return mapped;
};

const computeBasketsToName = (baskets) => {
  let mapped = {};
  Object.keys(baskets).forEach((e) => {
    const { schemes } = baskets[e];
    mapped[JSON.stringify(schemes)] = e;
  });
  return mapped;
};

const loadingReducer = (state = initialState, action) => {
  console.log("loadingReducer", action);
  switch (action.type) {
    case GET_FUNDS_SUCCESS: {
      return { ...state, funds: makeNamedState(action.payload) };
    }
    case GET_BASKETS_SUCCESS: {
      const baskets = makeNamedState(action.payload);
      localStorage.setItem("areBasketsStale", "false");
      return {
        ...state,
        baskets,
        basketsToName: computeBasketsToName(baskets),
      };
    }
    case PUT_BASKET_SUCCESS: {
      const { name, schemes, permanent } = action.payload;
      console.log("schemes", schemes);
      const key = JSON.stringify(schemes);
      return Object.assign({}, state, {
        baskets: { ...state.baskets, [name]: { schemes, permanent } },
        basketsToName: {
          ...state.basketsToName,
          [key]: name,
        },
      });
    }
    case DELETE_BASKET_SUCCESS: {
      const { schemes } = state.baskets[action.payload];
      localStorage.setItem("areBasketsStale", "true");
      const key = JSON.stringify(schemes);
      return Object.assign({}, state, {
        baskets: omit(state.baskets, action.payload),
        basketsToName: omit(state.basketsToName, key),
      });
    }
    case SET_CURRENT_BASKET: {
      return { ...state, currentBasket: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default loadingReducer;
