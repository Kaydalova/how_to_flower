import { api } from '../../utils/Api';

import {
  GET_PLANTS,
  GET_PLANTS1,
  GET_PLANTS_FAILED,
  GET_PLANTS_SUCCESS,
  ADD_FLOWER,
  ADD_FLOWER_FAILED,
  ADD_FLOWER_SUCCESS,
  GET_MY_FLOWERS,
  GET_MY_FLOWERS1,
  GET_MY_FLOWERS_FAILED,
  GET_MY_FLOWERS_SUCCESS,
  EDIT_FLOWER,
  EDIT_FLOWER_FAILED,
  EDIT_FLOWER_SUCCESS,
  DELETE_FLOWER,
  DELETE_FLOWER_FAILED,
  DELETE_FLOWER_SUCCESS,
} from "../../utils/constants";

export function getPlants() {
  return function(dispatch) {
    dispatch({
      type: GET_PLANTS
    })
    api.getAllPlants().then( res  => {
      if (res) {
        dispatch({
          type: GET_PLANTS_SUCCESS,
          plants: res
        })
      } else {
        dispatch({
          type: GET_PLANTS_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: GET_PLANTS_FAILED
      })
    })
  }
} 

  export function getPlants1(data) {
    return {
      type: GET_PLANTS1,
      plants1: data
    }
  }

  export function getMyFlowers1(data) {
    return {
      type: GET_MY_FLOWERS1,
      myFlowers1: data
    }
  }

export function getMyFlowers() {
  return function(dispatch) {
    dispatch({
      type: GET_MY_FLOWERS
    })
    api.getUserPlantsRequest().then( res  => {
      if (res) {
        dispatch({
          type: GET_MY_FLOWERS_SUCCESS,
          myFlowers: res
        })
      } else {
        dispatch({
          type: GET_MY_FLOWERS_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: GET_MY_FLOWERS_FAILED
      })
    })
  }
}

export function addNewFlower(data) {
  return function(dispatch) {
    dispatch({
      type: ADD_FLOWER
    })
    api.addNewFlower(data).then( res  => {
      if (res) {
        dispatch({
          type: ADD_FLOWER_SUCCESS,
          newFlower: res
        })
      } else {
        dispatch({
          type: ADD_FLOWER_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: ADD_FLOWER_FAILED
      })
    })
  }
}

export function editFlower(flowerID, data) {
  return function(dispatch) {
    dispatch({
      type: EDIT_FLOWER
    })
    api.editFlowerInfo(flowerID, data).then( res  => {
      if (res) {
        dispatch({
          type: EDIT_FLOWER_SUCCESS,
          editedFlower: res
        })
      } else {
        dispatch({
          type: EDIT_FLOWER_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: EDIT_FLOWER_FAILED
      })
    })
  }
} 

export function deleteFlower(flowerID) {
  return function(dispatch) {
    dispatch({
      type: DELETE_FLOWER
    })
    api.removeFlower(flowerID).then( res  => {
      if (res) {
        dispatch({
          type: DELETE_FLOWER_SUCCESS,
          deleteFlower: {res, flowerID}
        })
      } else {
        dispatch({
          type: DELETE_FLOWER_FAILED
        })
      }
    }).catch( err => {
      dispatch({
        type: DELETE_FLOWER_FAILED
      })
    })
  }
} 