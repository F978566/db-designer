import { ColumnModel } from "@/entities";
import { TableType } from "@/shared/types";
import { PropsWithChildren } from "react";

export type EnrichedTableCardProps = PropsWithChildren & {
    table: TableType;
    // columnModel: ColumnModel;
}