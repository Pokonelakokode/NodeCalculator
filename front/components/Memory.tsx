import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import { bindActionCreators } from "redux";
import {mainSelector} from "../store";
import {fetchMem, modMem, saveMem} from "../store/actions/fileMem";
import Button from "./Button";

const Memory: React.FC = () => {
    const actions = bindActionCreators({fetchMem}, useDispatch());
    const {baseValue} = useSelector(mainSelector);
    return (
        <div className="row no-gutters">
            <Button label={"MR"} col={2} onClick={async () => {
                actions.fetchMem({type: "ADD"});
            }}/>
            <Button label={"MS"} col={2} onClick={async () => {
                const message = (await saveMem(baseValue.toString()));

            }}/>
            <Button label={"M+"} col={2} onClick={async () => {
                console.log(await modMem(baseValue));
            }}/>
            <Button label={"M-"} col={2} onClick={async () => {
                console.log(await modMem(baseValue, "SUB"));
            }}/>
            <Button label={"MC"} col={2} onClick={async () => {
                console.log(await saveMem("0"));
            }}/>
        </div>
    );
};

export default Memory;
