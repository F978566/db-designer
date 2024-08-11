import { FormHTMLAttributes } from "react";

import "./style.scss";


type FormProps = FormHTMLAttributes<HTMLFormElement> &{
    title?: string;
}


export const Form = ({children, title, ...rest}: FormProps) => {
    return (
        <form className="formStyle" {...rest}>
            <p className="formTitle">{title}</p>
            {children}
        </form>
    )
}