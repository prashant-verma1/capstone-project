import { AppError } from "../errors/AppError";
import { createTask, fetchTaskByIdAndUserId, fetchTaskByUserId } from "../repositories/user.task.repository";
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
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getUserTaskById(
    userid: string,
    taskId: string
): Promise<Task> {
    if (!UUID_REGEX.test(taskId)) {
        throw new AppError(400, "Invalid task ID format");
    }

    const task = await fetchTaskByIdAndUserId(userid, taskId);
    if (!task) {
        throw new AppError(404, "This task not found");
    }
    return task;
}

   