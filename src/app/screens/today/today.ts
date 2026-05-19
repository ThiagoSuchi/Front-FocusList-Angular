import { Component, inject, OnInit, signal, type OnDestroy } from '@angular/core';
import { Title } from "../../components/shared/title/title";
import { TaskService } from '../../services/task.service';
import type { ITask } from '../../models/task.models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-today',
  imports: [Title],
  templateUrl: './today.html',
  styleUrl: './today.css',
  standalone: true
})
export class Today implements OnInit, OnDestroy {
  tasks = signal<ITask[]>([]);
  private destroy$ = new Subject<void>();
  readonly taskService = inject(TaskService);

  ngOnInit(): void {
    this.getAllTask();
  }

  // Evitar memory leak
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllTask(): void {
    this.taskService.getAllTask()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.tasks.set(data),
        error: (err) => console.error(err)
      });
  }

  postTask(event: Event, valueInput: HTMLInputElement) {
    event.preventDefault();

    const title = valueInput.value.trim();
    if (!title) return;

    this.taskService.postTask({ title, completed: false })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (createdTask) => {
          this.tasks.update(tasks => [...tasks, createdTask]);
          valueInput.value = '';
        },
        error: (err) => console.error('Erro ao criar task', err)
      });
  }

  taskCompleted(task: ITask): void {
    this.taskService.taskCompleted(task)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.tasks.update(tasks =>
            tasks.map(t =>
              t.id === task.id
              ? { ...t, completed: !t.completed }
              : t
            )
          )
        }// Depois de persistir no banco, o angular entra no nó(next) e salva localmente.
      })
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getAllTask());
  }
}