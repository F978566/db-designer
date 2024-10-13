import type { ColumnType, IColumnRepository } from "@/shared/types";
import { makeAutoObservable, runInAction } from "mobx";
import { container, inject, injectable } from "tsyringe";
import { ColumnStatus } from "./types";


@injectable()
export class ColumnModel {
    status: ColumnStatus = ColumnStatus.NOTHING;
    columns: Map<number, ColumnType[]> = new Map();

    constructor(@inject("IColumnRepository") private columnRepository: IColumnRepository) {
        makeAutoObservable(this);
    }

    async getTableColumns(tableId: number) {
        runInAction(() => {
            this.status = ColumnStatus.LOADING;
        })
        try {
            const columns = await this.columnRepository.getTableColumns(tableId);
            runInAction(() => {
                this.setColumns(columns);
                this.setStatus(ColumnStatus.FULFILLED);
            })
        } catch {
            this.setStatus(ColumnStatus.ERROR);
        }
    }

    setStatus(newStatus: ColumnStatus) {
        this.status = newStatus;
    }

    setColumns(columns: ColumnType[]) {
        for (const el of columns) {
            if (el.table in this.columns) {
                this.columns.get(el.table)?.push(el)
            } else {
                this.columns.set(el.table, [el])
            }
        }
    }
}

export const columnModel = container.resolve(ColumnModel);