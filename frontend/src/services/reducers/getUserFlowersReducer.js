import {
  SEND_USER_FLOWERS_REQUEST,
  SEND_USER_FLOWERS_REQUEST_FAILED,
  SEND_USER_FLOWERS_REQUEST_SUCCESS,
  REMOVE_USER_FLOWERS
} from "../../utils/constants";

const initialState = {
  sendGetFlowersRequest: false,
  sendGetFlowersRequestFailed: false,
  userFlowers: {}
}

export const getUserFlowersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_USER_FLOWERS_REQUEST: {
      return {
        ...state,
        sendGetFlowersRequest: true,
        sendGetFlowersFailed: false,
      };
    }
    case SEND_USER_FLOWERS_REQUEST_SUCCESS: {
      return { 
        ...state, 
        userFlowers: action.userFlowers, 
        sendGetFlowersRequest: false 
      };
    }
    case SEND_USER_FLOWERS_REQUEST_FAILED: {
      return { 
        ...state, 
        sendGetFlowersFailed: true, 
        sendGetFlowersRequest: false 
      };
    }
    case REMOVE_USER_FLOWERS: {
      return initialState
    }
    default: {
      return state
    }
  }
} 
