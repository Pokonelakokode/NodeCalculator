import * as React from "react";
import {useDispatch} from "react-redux";
import {pageStateActions} from "../store/pageState";
import Button from "./Button";

const Numericals: React.FC = (props) => {
    const dispatch = useDispatch();
    const rows: JSX.Element[] = [];
    for (let i = 0; i < 3; i++) {
        const cols: JSX.Element[] = [];
        for (let j = 0; j < 3; j++) {
            const num = 7 - (i * 3) + j;
            const addNum = () => dispatch(pageStateActions.ADD_TO_CURRENT_VALUE(num.toString()));
            cols.push(<Button col={4} key={j} label={num.toString()} onClick={addNum} />);
        }
        rows.push(<div className="row no-gutters" key={i}>{cols}</div>);
    }
    return (
        <div>
            {rows}
            <div className="row">
                <Button col={6}  label={"0"} onClick={() => dispatch(pageStateActions.ADD_TO_CURRENT_VALUE("0"))} />
                <Button col={6}  label={"."} onClick={() => dispatch(pageStateActions.ADD_TO_CURRENT_VALUE("."))} />
            </div>
        </div>
    );
};

export default Numericals;
