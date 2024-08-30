import { useContext } from "react";

import { InfoContext } from "./InfoContext";


export const useInfoContext = () => {
    const context = useContext(InfoContext);

    if (!context) {
        throw new Error("No InfoContext");
    }

    return context;
}