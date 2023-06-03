import {
  SET_PLANT,
  CLEAR_CURRENT_PLANT
} from "../../utils/constants";

export function setCurrentPlant(data) {
  return {
    type: SET_PLANT,
    /*id: data.id,
    name: data.name, 
    type: data.type,
    image: data.image, 
    temperature: data.temperature,
    light: data.light,
    watering: data.watering,
    pet_friendly: data.pet_friendly,
    pot: data.pot,
    plantModalIsOpen: true*/
    item: data
  }
}

export function removeCurrentPlant() {
  return {
    type: CLEAR_CURRENT_PLANT
  }
} 
