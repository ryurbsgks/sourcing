import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  isLogIn: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_LOGIN":
      return { 
        ...state, 
        isLogIn: action.payload 
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage
};

const persiReducer = persistReducer(persistConfig, reducer);

export default persiReducer;