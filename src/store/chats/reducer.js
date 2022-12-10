import { ADD_CHAT, DELETE_CHAT } from "./actions";

const initialState = [];

export const chatsReducer = (storeState = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT: {
      return [
        ...storeState,
        { name: action.payload.name, id: action.payload.id },
      ];
    }
    case DELETE_CHAT: {
      return storeState.filter(({ id }) => id !== action.payload);
    }
    default:
      return storeState;
  }
};