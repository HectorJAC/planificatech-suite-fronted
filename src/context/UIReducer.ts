import { Action, UIState } from "../interfaces/contextInterfaces";

export const uiReducer = (state: UIState, action: Action): UIState => {
  switch (action.type) {
  case 'SET_OPEN_SECTION':
    return {
      ...state,
      openSection: action.payload,
    };
  case 'SET_CLOSE_SECTION':
    return {
      ...state,
      closeSection: action.payload,
    };
  default:
    return state;
  }
};
