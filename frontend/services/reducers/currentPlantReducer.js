import {
  SET_PLANT,
  CLEAR_CURRENT_PLANT
} from "../../utils/constants";

const initialState = {
  currentPlant: {},
  plantModalIsOpen: false
}

export const currentPlantReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANT:
      return {
        ...state,
        currentPlant: action.item,
        
        plantModalIsOpen: true
      }
    case CLEAR_CURRENT_PLANT:
      return initialState
    default: {
      return state
    }
  }
} 
