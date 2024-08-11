import { ButtonHTMLAttributes } from "react";
import "./style.scss";


export const Button = ({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button className="button-style" {...rest}>
            {children}
        </button>
    )
}