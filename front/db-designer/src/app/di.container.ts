import { container } from "tsyringe";

import { ProjectRepository, UserRepository } from "@/shared/api";
import { ProjectModel } from "@/entities/project";

container.register("IProjectRepository", { useClass: ProjectRepository });
container.register("IUserRepository", { useClass: UserRepository });
container.register(ProjectModel, { useClass: ProjectModel })