import { AppDataSourse } from "../data-source"
import { User } from "../entities/User"

export const userRepository = AppDataSourse.getRepository(User)