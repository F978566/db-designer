import { container } from "tsyringe";

import { ProjectRepository, UserRepository } from "@/shared/api";
import { Projects } from "@/entities/project";

container.register("IProjectRepository", { useClass: ProjectRepository });
container.register("IUserRepository", { useClass: UserRepository });
container.register(Projects, { useClass: Projects })