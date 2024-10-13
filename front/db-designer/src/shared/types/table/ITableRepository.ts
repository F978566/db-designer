import { IBaseRepository } from "../BaseRepository";
import { TableType } from "./table";

export interface ITableRepository extends IBaseRepository<TableType> {
    getAll(id: number): Promise<TableType[]>;
}