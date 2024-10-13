import type { AxiosInstance } from "axios";
import { AxiosInstanceToken } from "./../base";
import { inject, injectable } from "tsyringe";
import { ColumnType, IColumnRepository } from "@/shared/types";


@injectable()
export class ColumnRepository implements IColumnRepository {
    constructor (@inject(AxiosInstanceToken) private axiosInstance: AxiosInstance) {}

    async getAll(projectId: number): Promise<ColumnType[]> {
        return (await this.axiosInstance.get(`columns/project-columns/${projectId}/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                }
            }
        )).data;
    }

    async getTableColumns(tableId: number): Promise<ColumnType[]> {
        return (await this.axiosInstance.get(`columns/table-columns/${tableId}/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                }
            }
        )).data;
    }

    async create(data: ColumnType): Promise<ColumnType> {
        return (await this.axiosInstance.post("/columns/", 
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                }
            }
        )).data;
    }

    async update(id: number, data: ColumnType): Promise<void> {}

    async delete(id: number): Promise<void> {}
}