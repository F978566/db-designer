import { useContext } from "react";
import { EnrichedTableCardProvider } from "./EnrichedTableCardProvider";

export const useEnrichedTableCardContext = () => {
    const context = useContext(EnrichedTableCardProvider);
    
    if (!context)
        throw new Error("No context");

    return context;
}