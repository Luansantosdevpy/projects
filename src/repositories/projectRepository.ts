import { AppDataSourse } from "../data-source"
import { Project } from "../entities/projects"

export const projectRepository = AppDataSourse.getRepository(Project)