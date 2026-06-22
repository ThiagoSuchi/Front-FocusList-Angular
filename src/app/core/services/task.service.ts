// Lógica de negócio

import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import type { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IDeleteRes, ITask, ITaskDTO } from '../../models/task.models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _httpClient = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/Task`

  // Listar todos 
  getAllTask(): Observable<ITask[]> {
    return this._httpClient.get<ITask[]>(this.API);
  }

  // Criar nova tarefa
  postTask(title: ITaskDTO): Observable<ITask> {
    return this._httpClient.post<ITask>(this.API, title);
  }

  // Atualizar status da tarefa
  updateTask(task: ITask): Observable<ITask> {
    return this._httpClient.put<ITask>(`${this.API}/${task.id}`, {
      title: task.title,
      completed: task.completed
    });
  }

  // Deletar tarefa
  deleteTask(taskId: number): Observable<IDeleteRes> {
    return this._httpClient.delete<IDeleteRes>(`${this.API}/${taskId}`);
  }
}
