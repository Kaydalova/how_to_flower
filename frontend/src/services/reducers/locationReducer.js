import {
  SET_LOCATION,
  REMOVE_LOCATIONS,
  ON_CLICK,
  REMOVE_ON_CLICK
} from "../../utils/constants";

const initialState = {
  locations: ['', '', ''],
  onClick: false,
  itemData: ''
}
  
export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_CLICK:
      return {
        ...state,
        onClick: true,
        itemData: action.currentItem,
      };
    case REMOVE_ON_CLICK:
      return {
        ...state,
        onClick: false,
        itemData: ''
      };
    case SET_LOCATION:
      return {
        ...state,
        locations: [
          action.currentLocation,
          state.locations[0],
          state.locations[1],
        ],
      };
    case REMOVE_LOCATIONS:
      return initialState
    default: {
      return state
    }
  }
} 
