import { createContext } from "react";
import { InfoProps } from "./InfoProps";


export const InfoContext = createContext<InfoProps | null>(null);