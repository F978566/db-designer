import { container } from "tsyringe";

import { ProjectRepository } from "./ProjectRepository";
import { UserRepository } from "./UserRepository";


container.register("IProjectRepository", { useClass: ProjectRepository });
container.register("IUserRepository", { useClass: UserRepository });