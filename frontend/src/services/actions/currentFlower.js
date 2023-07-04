import {
  SET_FLOWER,
  CLEAR_CURRENT_FLOWER
} from "../../utils/constants";

export function setCurrentFlower(data) {
  return {
    type: SET_FLOWER,
    id: data.id,
    name: data.name, 
    flower_type: data.flower_type,
    image: data.image,
    notification: true,
    editFlowerModalIsOpen: true
  }
}

export function removeCurrentFlower() {
  return {
    type: CLEAR_CURRENT_FLOWER
  }
} 
