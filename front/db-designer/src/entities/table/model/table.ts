import { makeAutoObservable, runInAction } from "mobx";
import { container, inject, injectable } from "tsyringe";

import type { ITableRepository, TableType } from "@/shared/types";
import { TableStatus } from "./type";


@injectable()
export class TableModel {
    status: TableStatus = TableStatus.NOTHING;
    tables: TableType[] = [];
    errors: string[] = [];

    constructor(@inject("ITableRepository") private tableRepository: ITableRepository) {
        makeAutoObservable(this);
    }

    async get(projectId: number) {
        runInAction(() => {
            this.setStatus(TableStatus.LOADING);
        })
        try {
            const res = await this.tableRepository.getAll(projectId);
            runInAction(() => {
                this.setStatus(TableStatus.FULFILLED);
                this.setTables(res);

            })
        } catch (err: any) {
            runInAction(() => {
                this.setStatus(TableStatus.ERROR);
                this.setError(["Failed load tables =("]);
            })
        }
    }

    setStatus(newStatus: TableStatus) {
        this.status = newStatus;
    }

    setError(errors: string[]) {
        this.errors = errors;
    }

    setTables(tables: TableType[]) {
        this.tables = tables;
    }
}


export const tableModel = container.resolve(TableModel);