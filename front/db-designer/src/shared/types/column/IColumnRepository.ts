import { IBaseRepository } from "../BaseRepository";
import { ColumnType } from "./column";

export interface IColumnRepository extends IBaseRepository<ColumnType> {
    getAll(projectId: number): Promise<ColumnType[]>;
    getTableColumns(tableId: number): Promise<ColumnType[]>;
}