import * as React from "react";
import {getCalculation, IOperation} from "../store/pageState";

interface IProps {
    value: string;
    operations: IOperation[];
}

const Display: React.FC<IProps> = ({value, operations}) => {
    const parsedValue = parseFloat(value);
    const displayValue = isNaN(parsedValue) ? 0 : parsedValue;
    const operationString = operations.reduce((agg: string, operation) => {
        let val = parseFloat(operation.value);
        val = isNaN(val) ? 0 : val;
        return agg.concat(` ${operation.operator} ${val}`);
    }, "");
    const calculated = getCalculation(value, operations);
    return (
        <div className="row">
            <h3 className="col-12 text-right display">
                {displayValue + operationString}
            </h3>
            <h3 className="col-12 text-right calculation">
                {calculated}
            </h3>
        </div>
    );
};

export default Display;
