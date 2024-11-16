import { makeAutoObservable, runInAction } from "mobx";
import { container, inject, injectable } from "tsyringe";

import type { IDataType, IDataTypeRepository } from "@/shared/types";
import { DataTypeStatus } from "./types";


@injectable()
export class DataTypeModel {
    status: DataTypeStatus = DataTypeStatus.NOTHING;
    data: IDataType[] = [];
    errors: string[] = [];

    constructor (@inject("IDataTypeRepository") private dataTypeRepository: IDataTypeRepository) {
        makeAutoObservable(this);
    }

    async getAll() {
        runInAction(() => {
            this.setStatus(DataTypeStatus.LOADING)
        })
        try {
            const res = await this.dataTypeRepository.getAll();
            runInAction(() => {
                this.setData(res);
                this.setStatus(DataTypeStatus.FULFILLED);
            })
        } catch {
            runInAction(() => {
                this.setStatus(DataTypeStatus.ERROR);
                this.setErrors(["Error laoding datatypes =("]);
            })
        }
    }

    setStatus(newStatus: DataTypeStatus) {
        this.status = newStatus;
    }

    setData(newData: IDataType[]) {
        this.data = newData;
    }

    setErrors(newErros: string[]) {
        this.errors = newErros;
    }
}

export const dataTypeModel = container.resolve(DataTypeModel);