import { PropsWithChildren } from "react";


export type InfoProps = PropsWithChildren & {
    mainInfoText: string;
    minorInfoText: string;
}