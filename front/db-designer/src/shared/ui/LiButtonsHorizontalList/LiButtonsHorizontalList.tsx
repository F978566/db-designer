import { PropsWithChildren } from "react";

import "./style.scss";


export const LiButtonsHorizontalList = ({ children }: PropsWithChildren) => {
    return (
        <div className="list-wrapper">
            { children }
        </div>
    )
}