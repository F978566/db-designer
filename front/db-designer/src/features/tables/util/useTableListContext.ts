import { useContext } from "react";
import { TableListProvider } from "./TableListProvider";


export const useTableListContext = () => {
    const context = useContext(TableListProvider);

    if (!context)
        throw Error("No project context")

    return context
}