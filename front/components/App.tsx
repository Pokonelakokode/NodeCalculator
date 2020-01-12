import {bindActionCreators} from "@reduxjs/toolkit";
import {useEffect} from "react";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {mainSelector} from "../store";
import {isOperator, pageStateActions} from "../store/pageState";
import Display from "./Display";
import Memory from "./Memory";
import Numericals from "./Numericals";
import Operators from "./Operators";

const App: React.FC = (props) => {
    useEffect(() => {
    }, []);
    const {baseValue, operations} = useSelector(mainSelector);
    const actions = bindActionCreators({
        addNum: pageStateActions.ADD_TO_CURRENT_VALUE,
        addOperation: pageStateActions.ADD_OPERATION,
        execute: pageStateActions.EXECUTE,
        removeNum: pageStateActions.REMOVE_FROM_CURRENT_VALUE,
        setObj: pageStateActions.SET_OBJ,
    }, useDispatch());
    useEffect(() => {
        document.getElementById("App")!.onkeydown = (e) => {
            switch (true) {
                case !isNaN(parseInt(e.key, 10)) || e.key === "." || e.key === ",":
                    return actions.addNum(e.key === "," ? "." : e.key);
                case e.key === "Backspace":
                    return actions.removeNum();
                case isOperator(e.key):
                    return isOperator(e.key) ? actions.addOperation({operator: e.key}) : null;
                case e.key === "Enter":
                    return actions.execute();
                case e.key === "Escape":
                    return actions.setObj({baseValue: "0", operations: []});
                default:
                    return null;
            }
        };
    });
    return (
        <div id="App" className="container" tabIndex={0}>
            <Display value={(baseValue)} operations={operations}/>
            <Memory/>
            <div className="row no-gutters">
                <div className="col-8">
                    <Numericals/>
                </div>
                <div className="col-4">
                    <Operators/>
                </div>
            </div>

        </div>
    );
};

export default App;
