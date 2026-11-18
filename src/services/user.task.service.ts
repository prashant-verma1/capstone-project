import { AppError } from "../errors/AppError";
import { createTask, fetchTaskByIdAndUserId, fetchTaskByUserId, updateTaskById } from "../repositories/user.task.repository";
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

export async function getUserTaskById(
    userid: string,
    taskId: string
): Promise<Task> {
    const task = await fetchTaskByIdAndUserId(userid, taskId);
    if (!task) {
        throw new AppError(404, "This task not found");
    }
    return task;
}
export async function updateUserTaskById(
    userid: string,
    taskId: string,
    title: string

): Promise<Task> {
    const validTitle = validateTitle(title);
    const updateTask = await updateTaskById(userid, taskId, validTitle);
    if(!updateTask){
        throw new AppError(404,"This task not found")    
    }
    
    return updateTask;
}

   