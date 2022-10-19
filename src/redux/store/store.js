import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "../reducers/rootReducer";
import rootSaga from "../middleware/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
