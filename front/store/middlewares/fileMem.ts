import {Dispatch, MiddlewareAPI} from "redux";
import {fetchMem, loadMem} from "../actions/fileMem";
import {RootActions, RootState} from "../index";
import {pageStateActions} from "../pageState";

export const fileMem = (store: MiddlewareAPI<any, RootState>) =>
    (next: Dispatch<RootActions>) =>
        async (action: RootActions) => {
            if (fetchMem.match(action)) {
                const mem = await loadMem();
                next(pageStateActions.SET_OBJ({
                    mem,
                }));
                if (action.payload.type === "ADD") {
                    return store.dispatch(pageStateActions.SET_OBJ({
                        baseValue: mem ? mem.toString() : "0",
                    }));
                }

            }
            return next(action);
        };
