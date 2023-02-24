import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express'
import { BadRequestError } from '../helpers/api-error'
import { userRepository } from '../repositories/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserController {
	async create(req: Request, res: Response) {
		try {
			const { name, email, password } = req.body

			const userExists = await userRepository.findOneBy({ email })

			if(userExists){
				throw new Error('Email already exists');
			}

			const hashPassword = await bcrypt.hash(password, 10)

			console.log(hashPassword)

			const newUser = userRepository.create({ 
				id: uuidv4(),
				name,
				email,
				password: hashPassword
			})

			await userRepository.save(newUser)

			const { password: _, ...user } = newUser

			return res.status(201).json(user)	
		} catch (error) {
			console.log(error);
			return res.status(400);
		}
	}

	async login(req: Request, res: Response) {
		const { email, password } = req.body

		const user = await userRepository.findOneBy({ email })

		if (!user) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

		const verifyPass = await bcrypt.compare(password, user.password)

		if (!verifyPass) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
			expiresIn: '8h',
		})

		const { password: _, ...userLogin } = user

		return res.json({
			user: userLogin,
			token: token,
		})
	}

	async getProfile(req: Request, res: Response) {
		return res.json(req.user)
	}
}