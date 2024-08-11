import React, { InputHTMLAttributes } from "react";
import "./style.scss";

export const Input = React.forwardRef((props: InputHTMLAttributes<HTMLInputElement>, ref: any) => {
    return (
        <input ref={ref} className="inputStyle" {...props} />
    )
})