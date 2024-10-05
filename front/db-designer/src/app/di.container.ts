import { container } from "tsyringe";

import { ProjectRepository, UserRepository, TableRepository } from "@/shared/api";

container.register("IProjectRepository", { useClass: ProjectRepository });
container.register("IUserRepository", { useClass: UserRepository });
container.register("ITableRepository", { useClass: TableRepository });