import { combineReducers } from 'redux';
import { plantsReducer } from "./plantsReducer";
import { currentPlantReducer } from "./currentPlantReducer";
import { currentFlowerReducer } from "./currentFlowerReducer";
import { getUserFlowersReducer } from "./getUserFlowersReducer";
import { resetPasswordReducer } from "./resetPasswordReducer";
import { authReducer } from "./authReducer";
import {locationReducer} from './locationReducer';

export const rootReducer = combineReducers({
  plantsReducer,
  authReducer,
  getUserFlowersReducer,
  currentPlantReducer,
  currentFlowerReducer,/*
  resetPasswordReducer,
  locationReducer*/
}) 
