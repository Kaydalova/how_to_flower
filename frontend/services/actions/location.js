import {
  SET_LOCATION,
  REMOVE_LOCATIONS,
  ON_CLICK,
  REMOVE_ON_CLICK
} from "../../utils/constants";

export function setLocation(data) {
  return {
    type: SET_LOCATION,
    currentLocation: data
  }
}

export function removeLocations() {
  return {
    type: REMOVE_LOCATIONS
  }
} 

export function setOnClick(data) {
  return {
    type: ON_CLICK,
    currentItem: data
  }
}

export function removeOnClick() {
  return {
    type: REMOVE_ON_CLICK
  }
} 
