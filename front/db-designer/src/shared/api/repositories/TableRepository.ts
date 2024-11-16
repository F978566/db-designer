import { inject, injectable } from "tsyringe";

import { ITableRepository, TableType } from "@/shared/types";
import type { AxiosInstance } from "axios";
import { AxiosInstanceToken } from "../base";


@injectable()
export class TableRepository implements ITableRepository {
    constructor (@inject(AxiosInstanceToken) private axiosInstance: AxiosInstance) {}

    async getAll(id: number): Promise<TableType[]> {
        const res = await this.axiosInstance.get<TableType[]>(`/tables/project-tables/${id}/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                }
            }
        )

        return res.data;
    }

    async create(data: TableType): Promise<TableType> {
        const res = await this.axiosInstance.post<TableType>("/tables/",
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                },
            }
        )
        return res.data;
    }

    async update(id: number, data: TableType): Promise<void> {
        this.axiosInstance.patch(`/tables/${id}`, data);
    }

    async delete(id: number): Promise<void> {
        await this.axiosInstance.delete(`/tables/${id}/`, 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                },
            }
        )
    }
}