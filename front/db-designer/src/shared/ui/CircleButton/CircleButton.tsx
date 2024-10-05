import { HTMLAttributes } from "react";
import "./style.scss";


interface CircleButtonButtonProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}


export const CircleButton = ({ children, ...props }: CircleButtonButtonProps) => {
    return (
        <li {...props} className="circle_button">
            { children }
        </li>
    )
}