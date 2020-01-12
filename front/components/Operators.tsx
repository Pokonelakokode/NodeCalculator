import * as React from "react";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

import {pageStateActions} from "../store/pageState";
import Button from "./Button";

const Operators: React.FC = (props) => {
    const actions = bindActionCreators({
        addOperation: pageStateActions.ADD_OPERATION,
        execute: pageStateActions.EXECUTE,

        setObj: pageStateActions.SET_OBJ,
    }, useDispatch());
    return (
        <div>
            <div className="row no-gutters">
                <Button label={"+"} col={6} onClick={() => actions.addOperation({operator: "+"})}/>
                <Button label={"-"} col={6} onClick={() => actions.addOperation({operator: "-"})}/>
            </div>
            <div className="row no-gutters">
                <Button label={"*"} col={6} onClick={() => actions.addOperation({operator: "*"})}/>
                <Button label={"/"} col={6} onClick={() => actions.addOperation({operator: "/"})}/>
            </div>
            <div className="row">
                <Button label={"="} col={12} onClick={() => {
                    actions.execute();
                }}/>
            </div>

        </div>
    );
};

export default Operators;
