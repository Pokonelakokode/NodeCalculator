import {combineReducers, configureStore, createSelector} from "@reduxjs/toolkit";
import {fileMem} from "./middlewares/fileMem";
import {IPageStateActions, pageStateReducer} from "./pageState";

export const rootReducer = combineReducers({
    pageState: pageStateReducer,
});

export const store = configureStore<RootState>({
    devTools: process.env.NODE_ENV === "production" ? false : {trace: true, traceLimit: 25},
    middleware: [fileMem],
    reducer: rootReducer,
});

export const mainSelector = (state: RootState) => state.pageState;

export type RootState = ReturnType<typeof rootReducer>;
export type RootActions = IPageStateActions[keyof IPageStateActions];
