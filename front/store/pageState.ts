import {createSlice, PayloadAction} from "@reduxjs/toolkit";

enum PageStateActionTypes {
    ADD_TO_CURRENT_VALUE = "ADD_TO_CURRENT_VALUE",
    REMOVE_FROM_CURRENT_VALUE = "REMOVE_FROM_CURRENT_VALUE",
    SET_OBJ = "SET_OBJ",
    ADD_OPERATION = "ADD_OPERATION",
    EXECUTE = "EXECUTE",
}

export interface IOperation {
    operator: Operator;
    value: string;
}

export type Operator = "+" | "-" | "*" | "/";

interface IPageState {
    readonly baseValue: string;
    readonly operations: IOperation[];
    readonly selectedOperator: Operator | null;
    readonly loaded: boolean;
    readonly mem: number;
}

export interface IPageStateActions {
    SET_OBJ: PayloadAction<Partial<IPageState>>;
    ADD_TO_CURRENT_VALUE: PayloadAction<string>;
    REMOVE_FROM_CURRENT_VALUE: PayloadAction;
    ADD_OPERATION: PayloadAction<{operator: Operator}>;
    EXECUTE: PayloadAction;
}

const initialState: IPageState = {
    baseValue: "0",
    loaded: false,
    mem: 0,
    operations: [],
    selectedOperator: null,
};

const pageState = createSlice({
    initialState,
    name: "pageState",
    reducers: {
        [PageStateActionTypes.SET_OBJ]:
            (state, action: IPageStateActions["SET_OBJ"]) => {
                return {...state, ...action.payload};
            },
        [PageStateActionTypes.ADD_TO_CURRENT_VALUE]:
            (state, action: IPageStateActions["ADD_TO_CURRENT_VALUE"]) => {
                return state.operations.length > 0 ?
                    {
                        ...state,
                        operations: state.operations.map((operation, index) => (
                            index < state.operations.length - 1 ?
                                operation :
                                {...operation, value: sanitizeNumber(operation.value + action.payload)}
                        )),
                    } :
                    {
                        ...state,
                        baseValue: sanitizeNumber(state.baseValue + action.payload),
                    };
            },
        [PageStateActionTypes.REMOVE_FROM_CURRENT_VALUE]:
            (state, action: IPageStateActions["REMOVE_FROM_CURRENT_VALUE"]) => {
                return state.operations.length > 0 ?
                    {
                        ...state,
                        operations: state.operations.reduce((agg: IOperation[], operation, index) => {
                            index < state.operations.length - 1 ?
                                agg.push(operation) :
                                // tslint:disable-next-line:no-unused-expression
                                operation.value.length > 1 && agg.push(
                                    {...operation, value: operation.value.slice(0, -1)},
                                );

                            return agg;
                        },[]),
                    } :
                    {
                        ...state,
                        baseValue: state.baseValue.slice(0, -1),
                    };

            },
        [PageStateActionTypes.ADD_OPERATION]:
            (state, action: IPageStateActions["ADD_OPERATION"]) => {
            return {
                ...state,
                operations: [...state.operations, {operator: action.payload.operator, value: "0"}],
            };
        },
        [PageStateActionTypes.EXECUTE]:
            (state, action: IPageStateActions["EXECUTE"]) => {
                return {
                    ...state,
                    baseValue: getCalculation(state.baseValue, state.operations).toString(),
                    operations: [],
                };
            },
    },
});

function sanitizeNumber(str: string): string {
    let occurence = 0;
    return str.replace(/^0+/, "").replace(/\./g,(match) => {
        occurence++;
        return occurence > 1 ? "" : match;
    });
}

export function isOperator(str: string): str is Operator {return ["+", "-", "*", "/"].includes(str)}

export function getCalculation(baseValue: string, operations: IOperation[]) {
    const parsedValue = parseFloat(baseValue);
    const calculation =  operations.reduce((agg: number, operation) => {
        const val = parseFloat(operation.value);
        if(isNaN(val)) { return agg; }
        switch (operation.operator) {
            case "*":
                agg = agg * val;
                break;
            case "/":
                agg = agg / val;
                break;
            case "+":
                agg += val;
                break;
            case "-":
                agg -= val;
                break;
        }
        return agg;
    }, isNaN(parsedValue) ? 0 : parsedValue);
    return isNaN(calculation) ? "Not a number" : calculation;
}

export const pageStateActions = pageState.actions;
export const pageStateReducer = pageState.reducer;

export default pageState;
