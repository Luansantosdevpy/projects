import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from "express";
import { projectRepository } from "../repositories/projectRepository";
import axios from 'axios';

export class ProjectController {
    async projects(req: Request, res: Response): Promise<Response> {
        
        try{
            const projects = await projectRepository.find()
    
            return res.status(201).json(projects)	
		} catch (error) {
			console.log(error);
			return res.status(400);
		}
    }

    async project(req: Request<{ id: string}>, res: Response): Promise<Response> {
        try{
            const { id } = req.params
            const project = await projectRepository.findOneBy({ id })
            const zip_code = project?.zip_code
            const viaCep = await axios.get(process.env.URL_VIA_CEP + `ws/${zip_code}/json`)
            
            console.log(viaCep.data.localidade, viaCep.data.uf)
            const projectWithCity = { 
                ... project, localidade: viaCep.data.localidade, uf: viaCep.data.uf
            }
            return res.status(201).json(projectWithCity)	
		} catch (error) {
			console.log(error);
			return res.status(400);
		}
    }

    async create(req: Request, res: Response){
        try{
            const {title, zip_code, cost, done, deadline, username} = req.body;

            const newProject = projectRepository.create({
                id: uuidv4(),
                title,
                zip_code,
                cost, 
                done,
                deadline,
                username
            })
    
            await projectRepository.save(newProject)
    
            return res.status(201).json(newProject)	
		} catch (error) {
			console.log(error);
			return res.status(400);
		}
    }

    // async changeDone(req: Request, res: Response){
    //     const { username } = req.params


    // }

    async delete(){
        
    }
}