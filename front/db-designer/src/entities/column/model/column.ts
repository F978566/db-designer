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
    // columns: Map<ColumnType["table"], ColumnType[]> = new Map();
    columns: ColumnType[] = [];
    updateList: number[] = [];
    notCreatedColumns: Array<number> = [];

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

    async patchColumns(columnId: number) {
        runInAction(() => {
            this.status = ColumnStatus.LOADING;
        })
        try {
            const data: ColumnType | undefined = this.columns.find(v => v.id === columnId)
            if (data === undefined)
                throw new Error("Column not found")

            await this.columnRepository.update(columnId, data);
            runInAction(() => {
                this.setStatus(ColumnStatus.FULFILLED);
            })
        } catch {
            this.setStatus(ColumnStatus.ERROR);
        }
    }

    async create(data: ColumnType) {
        runInAction(() => {
            this.status = ColumnStatus.LOADING;
        })
        try {
            if (data === undefined)
                throw new Error("Column not found")

            const newData = Object.assign({}, data)

            await this.columnRepository.create(newData)

            runInAction(() => {
                this.setStatus(ColumnStatus.FULFILLED);
            })
        } catch {
            this.setStatus(ColumnStatus.ERROR);
        }
    }

    async createColumnList() {
        for (let column of this.notCreatedColumns) {
            let newColumn = this.columns.find(col => col.id === column);
            if (newColumn !== undefined) {
                await this.create(newColumn);
            }
        }
        runInAction(() => this.notCreatedColumns = [])
    }

    async patchColumnsList() {
        for (let columnId of this.updateList) {
            await this.patchColumns(columnId);
        }
        this.updateList = []
    }

    setStatus(newStatus: ColumnStatus) {
        this.status = newStatus;
    }

    setColumns(columns: ColumnType[]) {
        this.columns = columns
    }

    setToUpdateList(id: number) {
        if (this.updateList.includes(id))
            return
        this.updateList.push(id)
    }

    setColumnName(id: number, newName: string) {
        let column = this.columns.find(col => col.id === id);

        if (column === undefined)
            return

        runInAction(() => {
            this.setToUpdateList(id);

            column.name = newName;
        })
    }

    add(data: ColumnType) {
        runInAction(() => {
            let idList = this.columns.map((column: ColumnType) => column.id ?? 0);
            let maxId = Math.max(...idList);
            data = {id: maxId + 1, ...data};
            this.notCreatedColumns.push(maxId + 1);
            this.columns.push(data);
        })
    }

    changeBooleanProperty(property: ColumnBooleanProperty, columnId: number) {
        let column: ColumnType | undefined = this.columns.find(column => column.id === columnId);
        if (column === undefined)
            return;
        column[property] = !column[property];
        this.setToUpdateList(columnId)
    }
}

export const columnModel = container.resolve(ColumnModel);