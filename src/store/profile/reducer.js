import { CHANGE_NAME, CHANGE_SHOW_NAME, VIEW_CHECKBOX } from "./actions";


const initialState = {
  name: "Default",
  showName: false,
  viewCheckbox: false
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SHOW_NAME: {
      return {
        ...state,
        showName: !state.showName,
      };
    }
    case CHANGE_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case VIEW_CHECKBOX: {
      return {
        ...state,
        viewCheckbox: !state.viewCheckbox
      };
    }
    default:
      return state;
  }
};