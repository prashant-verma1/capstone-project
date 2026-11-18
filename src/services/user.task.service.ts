import { AppError } from "../errors/AppError";
import { createTask, fetchTaskByUserId } from "../repositories/user.task.repository";
import { Task } from "../types/task";


function validateTitle(title:unknown):string{
    if(typeof title !== 'string' || !title.trim()){
        throw new AppError(400,"Title is required")
    }
    const trimmedTitle = title.trim()
    if(trimmedTitle.length >100){
        throw new AppError(400,"Title can not be more than 100 charactred")
    }
    
    return trimmedTitle
}

export async function createUserTask(userid: string, title: unknown):Promise<Task>{
    const validTitle = validateTitle(title);
    return await createTask(userid, validTitle);
}

export async function getUserTasks(userid: string):Promise<Task[]>{
    return await fetchTaskByUserId(userid)
}

   