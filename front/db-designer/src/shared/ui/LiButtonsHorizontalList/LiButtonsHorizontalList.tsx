import { PropsWithChildren } from "react";

import { MenuSvg } from "../SVGs";
import "./style.scss";


export const LiButtonsHorizontalList = ({ children }: PropsWithChildren) => {
    return (
        <div className="list-wrapper">
            <MenuSvg className="menu-button" />
            { children }
        </div>
    )
}