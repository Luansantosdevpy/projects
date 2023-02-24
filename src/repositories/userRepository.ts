import { AppDataSourse } from "../data-source"
import { User } from "../entities/user"

export const userRepository = AppDataSourse.getRepository(User)