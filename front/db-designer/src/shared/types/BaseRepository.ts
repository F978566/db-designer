export interface IBaseRepository<T> {
    create(data: T): Promise<T>;
    update(id: number, data: T): Promise<void>;
    delete(id: number): Promise<void>;
    getAll(id?: number): Promise<T[]>;
}