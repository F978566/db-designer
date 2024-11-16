import { container } from "tsyringe";

import {
    ProjectRepository,
    UserRepository,
    TableRepository,
    ColumnRepository,
    DataTypeRepository,
} from "@/shared/api";


container.register("IProjectRepository", { useClass: ProjectRepository });
container.register("IUserRepository", { useClass: UserRepository });
container.register("ITableRepository", { useClass: TableRepository });
container.register("IColumnRepository", { useClass: ColumnRepository })
container.register("IDataTypeRepository", { useClass: DataTypeRepository })