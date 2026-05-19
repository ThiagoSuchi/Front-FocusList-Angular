// Lógica de negócio

import { inject, Injectable } from '@angular/core';
import { ITask, type IDeleteRes, type ITaskDTO } from '../models/task.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import type { Observable } from 'rxjs';

const API = `${environment.apiUrl}api/Task`

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _httpClient = inject(HttpClient);

  constructor() { }

  // Listar todos 
  getAllTask(): Observable<ITask[]> {
    return this._httpClient.get<ITask[]>(API);
  }

  // Criar nova tarefa
  postTask(title: ITaskDTO): Observable<ITask> {
    return this._httpClient.post<ITask>(API, title);
  }

  // IMPLEMENTAR EDIÇÃO(UPDATE) DE TAREFA


  // Atualizar status da tarefa
  taskCompleted(task: ITask): Observable<ITask> {
    return this._httpClient.put<ITask>(`${API}/${task.id}`, {
      title: task.title,
      completed: !task.completed
    });
  }

  // Deletar tarefa
  deleteTask(taskId: number): Observable<IDeleteRes> {
    return this._httpClient.delete<IDeleteRes>(`${API}/${taskId}`);
  }
}
