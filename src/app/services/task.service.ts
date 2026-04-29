// Lógica de negócio e persistência (localStorage)

import { effect, Injectable, signal } from '@angular/core';
import { Task } from '../models/task.models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _tasks = signal<Task[]>([]);

  readonly tasks = this._tasks.asReadonly();

  constructor() {
    const key = 'tasks'
    
    this._load(key);

    effect(() => {
      const listTasks = this._tasks();

      localStorage.setItem(key, JSON.stringify(listTasks));
    })
  }

  // Criar nova tarefa
  postTask(title: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false
    };

    this._tasks.update(task => [...task, newTask]);
  }

  // Atualizar status da tarefa
 taskCompleted(task: Task) {
  this._tasks.update((tasks) => 
    tasks.map((t) => 
      t.id === task.id ? { ...t, completed: !t.completed } : t
    )
  )
 }

  // Deletar tarefa
  deleteTask(taskId: string) {
    this._tasks.update(task => task.filter(item => item.id != taskId));
  }

  // Persistência do ToDo no LocalStorage
  _load(key: string) {
    const data = localStorage.getItem(key);
    return data ? this._tasks.set(JSON.parse(data)) : []
  }
}
