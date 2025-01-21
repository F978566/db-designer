import { createContext } from "react";
import { EnrichedTableCardProps } from "./EnrichedTableCardProps";

export const EnrichedTableCardProvider = createContext<EnrichedTableCardProps | null>(null);