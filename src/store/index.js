import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import { loadingBarReducer } from "react-redux-loading-bar";
import cartReducer from "./reducers/handleCart";

const authPersistConfig = { key: "auth", storage };
const cartPersistConfig = { key: "cart", storage };
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  loadingBar: loadingBarReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
});

const syncConfig = {
  blacklist: ["persist/PERSIST"],
};
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, createStateSyncMiddleware(syncConfig)],
});
initMessageListener(store);
export default store;
export const persistor = persistStore(store);
