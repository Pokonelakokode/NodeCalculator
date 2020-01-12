import * as React from "react";

interface IProps {
    label: string;
    col: number;
    onClick: any;
}

const Button: React.FC<IProps> = ({label, col, onClick}) => {
    return (
        <div className={`col-${col} mt-2`}>
            <div className="numeric" onClick={onClick}>
                {label}
            </div>
        </div>
    );
};

export default Button;
