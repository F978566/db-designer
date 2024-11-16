import { IBaseRepository } from "../BaseRepository";
import { IDataType } from "./datatype";


export interface IDataTypeRepository extends IBaseRepository<IDataType> {
    getAll(): Promise<IDataType[]>;
}