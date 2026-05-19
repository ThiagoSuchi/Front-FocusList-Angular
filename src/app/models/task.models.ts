// Interface que define a estrutura de uma tarefa

export interface ITask {
    id: number,
    title: string,
    completed: boolean
}

export interface ITaskDTO {
    title: string 
    completed: boolean  
}

export interface IDeleteRes {
    message: string
}