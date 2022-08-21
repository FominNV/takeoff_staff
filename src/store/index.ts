import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { userReducer } from "./users/reducer";

export type RootState = ReturnType<typeof combinedReducer>;

const combinedReducer = combineReducers({
  user: userReducer,
});

const composeEnhancers = composeWithDevTools({});

export const store = createStore(
  combinedReducer,
  {},
  composeEnhancers(applyMiddleware(thunk)),
);

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
