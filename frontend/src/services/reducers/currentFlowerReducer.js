import {
  SET_FLOWER,
  CLEAR_CURRENT_FLOWER
} from "../../utils/constants";

const initialState = {
  currentFlower: null,
  editFlowerModalIsOpen: false
}

export const currentFlowerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FLOWER:
      return {
        ...state,
        currentFlower: {
          id: action.id,
          name: action.name, 
          flower_type: action.flower_type,
          image: action.image,
          notification: action.notification, 
        },
        editFlowerModalIsOpen: true
      }
    case CLEAR_CURRENT_FLOWER:
      return initialState
    default: {
      return state
    }
  }
} 
