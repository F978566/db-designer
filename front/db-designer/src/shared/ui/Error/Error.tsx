import { PropsWithChildren } from "react";

import { ErrorSvg } from "@/shared/ui";
import "./style.scss";


export const Error = ({ children }: PropsWithChildren) => {
    return (
        <div className="error-container">
            <ErrorSvg />
            <p>{children}</p>
            <ErrorSvg />
        </div>
    )
}