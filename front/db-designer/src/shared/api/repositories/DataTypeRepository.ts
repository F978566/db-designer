import type { AxiosInstance } from "axios";
import { container, inject, injectable } from "tsyringe";

import { IDataType, IDataTypeRepository } from "@/shared/types";
import { AxiosInstanceToken } from "./../base";


@injectable()
export class DataTypeRepository implements IDataTypeRepository {
    constructor (@inject(AxiosInstanceToken) private axiosInstance: AxiosInstance) {}

    async getAll() {
        const res = await this.axiosInstance.get<IDataType[]>("datatypes/", 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                }
            }
        );
        return res.data;
    }
    
    async create(data: IDataType) {
        const res = await this.axiosInstance.post("datatypes/", 
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                }
            }
        )
    
        return res.data;
    }
    
    async update(id: number, data: IDataType) {}
    
    async delete(id: number) {

    }
}

container.register("IDataTypeRepository", { useClass: DataTypeRepository });