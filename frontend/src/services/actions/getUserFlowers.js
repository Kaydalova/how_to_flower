import { api } from '../../utils/Api';

import {
  SEND_USER_FLOWERS_REQUEST,
  SEND_USER_FLOWERS_REQUEST_FAILED,
  SEND_USER_FLOWERS_REQUEST_SUCCESS,
  REMOVE_USER_FLOWERS
} from "../../utils/constants";

export function getUserFlowers(data) {
  return function(dispatch) {
    dispatch({
      type: SEND_USER_FLOWERS_REQUEST
    })
    api.getUserPlantsRequest().then( res  => {
      if (res) {
        dispatch({
          type: SEND_USER_FLOWERS_REQUEST_SUCCESS,
          userFlowers: res
        })
      } else {
        dispatch({
          type: SEND_USER_FLOWERS_REQUEST_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: SEND_USER_FLOWERS_REQUEST_FAILED
      })
    })
  }
}

export function removeUserFlowers() {
  return {
    type: REMOVE_USER_FLOWERS
  }
} 
