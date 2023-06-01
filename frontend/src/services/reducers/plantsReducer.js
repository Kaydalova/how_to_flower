import {
  GET_PLANTS,
  GET_PLANTS_FAILED,
  GET_PLANTS_SUCCESS,
  ADD_FLOWER,
  ADD_FLOWER_FAILED,
  ADD_FLOWER_SUCCESS,
  GET_MY_FLOWERS,
  GET_MY_FLOWERS_FAILED,
  GET_MY_FLOWERS_SUCCESS,
  EDIT_FLOWER,
  EDIT_FLOWER_FAILED,
  EDIT_FLOWER_SUCCESS,
  DELETE_FLOWER,
  DELETE_FLOWER_FAILED,
  DELETE_FLOWER_SUCCESS,
  } from "../../utils/constants";

const initialState = {
  plantsRequest: false,
  plantsRequestFailed: false,
  plants: null,
  myFlowersRequest: false,
  myFlowersRequestFailed: false,
  myFlowers: null,
  addFlowerRequest: false,
  addFlowerRequestFailed: false,
}

export const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLANTS: {
      return {
        ...state,
        plantsRequest: true,
        plantsRequestFailed: false,
      };
    }
    case GET_PLANTS_SUCCESS: {
      return { 
        ...state, 
        plants: action.plants, 
        plantsRequest: false 
      };
    }
    case GET_PLANTS_FAILED: {
      return { 
        initialState, 
        plantsRequestFailed: true, 
        plantsRequest: false 
      };
    }
    case GET_MY_FLOWERS: {
      return {
        ...state,
        myFlowersRequest: true,
        myFlowersRequestFailed: false,
      };
    }
    case GET_MY_FLOWERS_SUCCESS: {
      return { 
        ...state, 
        myFlowers: action.myFlowers, 
        myFlowersRequest: false 
      };
    }
    case GET_MY_FLOWERS_FAILED: {
      return { 
        initialState, 
        myFlowersRequestFailed: true, 
        myFlowersRequest: false 
      };
    }
    case ADD_FLOWER: {
      return {
        ...state,
        addFlowerRequest: true,
        addFlowerRequestFailed: false,
      };
    }
    case ADD_FLOWER_SUCCESS: {
      return {
        ...state,
        myFlowers: [
          ...state.myFlowers,
          action.newFlower
        ],
        addFlowerRequest: false
      };
    }
    case ADD_FLOWER_FAILED: {
      return { 
        ...state, 
        addFlowerRequestFailed: true, 
        addFlowerRequest: false 
      };
    }
    case DELETE_FLOWER: {
      return {
        ...state,
        myFlowers: state.myFlowers.filter(
          (item1) => (item1.id !== action.flowerID)
        ),
      };
    }
    case EDIT_FLOWER: {
      const editedOne = state.myFlowers.indexOf((item1) => (item1.id === action.editedFlower.id));
      return {
        ...state,
        myFlowers: [state.myFlowers.splice(editedOne, 1, action.editedFlower)],
      };
    }
    /*case DELETE_FLOWER_SUCCESS: {
      return {
        ...state,
        myFlowers: [
          ...state.myFlowers,
          action.newFlower
        ],
        addFlowerRequest: false
      };
    }
    case DELETE_FLOWER_FAILED: {
      return { 
        ...state, 
        addFlowerRequestFailed: true, 
        addFlowerRequest: false 
      };
    }*/
    default: {
      return state
    }
  }
} 
