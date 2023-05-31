import {
  SET_PLANT,
  CLEAR_CURRENT_PLANT
} from "../../utils/constants";

const initialState = {
  currentItem: {},
  plantModalIsOpen: false
}

export const currentPlantReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANT:
      return {
        ...state,
        currentItem: {
          id: action.id,
          name: action.name, 
          type: action.type,
          image: action.image, 
          temperature: action.temperature,
          light: action.light,
          watering: action.watering,
          pet_friendly: action.pet_friendly,
          pot: action.pot,
        },
        plantModalIsOpen: true
      }
    case CLEAR_CURRENT_PLANT:
      return initialState
    default: {
      return state
    }
  }
} 
