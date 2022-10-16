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

export default reducer;