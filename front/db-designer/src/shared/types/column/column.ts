export type ColumnType = {
    id?: number;
    name: string;
    description?: string;
    table: number;
    data_type: number;
    data_type_name?: string;
    is_primary_key: boolean;
    is_nullable: boolean;
    is_relationship: boolean;
    created_at?: string;
}