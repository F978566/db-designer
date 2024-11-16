import { makeAutoObservable, runInAction } from "mobx";
import { container, inject, injectable } from "tsyringe";

import type { ColumnType, IColumnRepository } from "@/shared/types";
import { ColumnStatus } from "./types";


export enum ColumnBooleanProperty {
    is_primary_key = "is_primary_key",
    is_nullable = "is_nullable",
    is_relationship = "is_relationship",
}


@injectable()
export class ColumnModel {
    status: ColumnStatus = ColumnStatus.NOTHING;
    columns: Map<ColumnType["table"], ColumnType[]> = new Map();

    constructor(@inject("IColumnRepository") private columnRepository: IColumnRepository) {
        makeAutoObservable(this);
    }

    async getProjectColumns(projectId: number) {
        runInAction(() => {
            this.status = ColumnStatus.LOADING;
        })
        try {
            const columns = await this.columnRepository.getAll(projectId);
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

    changeBooleanProperty(property: ColumnBooleanProperty, tableId: number, columnId: number) {
        let tableColumns: ColumnType[] | undefined = this.columns.get(tableId)
        if (tableColumns === undefined)
            return
        for (let el of tableColumns) {
            if (el.id === columnId) {
                el[property] = !el[property]
            }
        }
    }
}

export const columnModel = container.resolve(ColumnModel);