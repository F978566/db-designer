import { createContext } from "react";

import { ColumnModel, TableModel } from "@/entities";


export const TableListProvider = createContext<{ tableModel: TableModel, columnModel: ColumnModel } | null>(null)