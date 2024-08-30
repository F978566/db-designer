export interface IBaseRepository<T> {
    create(data: T): Promise<void>;
    update(id: number, data: T): Promise<void>;
    delete(id: number): Promise<void>;
    getAll(): Promise<T[]>;
}