import { Component, computed, inject, OnInit, signal, type OnDestroy } from '@angular/core';
import { Title } from "../../components/shared/title/title";
import { TaskService } from '../../services/task.service';
import type { ITask } from '../../models/task.models';
import { delay, finalize, Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackBarService } from '../../components/shared/material/snack-bar.service';
import { Footer } from '../../components/shared/footer/footer';

@Component({
  selector: 'app-today',
  imports: [Title, MatProgressSpinnerModule, Footer],
  templateUrl: './today.html',
  styleUrl: './today.css',
  standalone: true
})
export class Today implements OnInit, OnDestroy {
  private readonly taskService = inject(TaskService);

  private readonly destroy$ = new Subject<void>();

  public readonly tasks = signal<ITask[]>([]);

  public readonly isLoadingTask = signal(false);

  public errorMessage = '';

  private readonly snackBarService = inject(SnackBarService);

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

    this.isLoadingTask.set(true);

    this.taskService.postTask({ title, completed: false })
      .pipe(
        delay(1000),
        takeUntil(this.destroy$),
        finalize(() => this.isLoadingTask.set(false))
      )
      .subscribe({
        next: (createdTask) => {
          this.tasks.update(tasks => [...tasks, createdTask]);
          valueInput.value = '';
        },
        error: (err) => {
          this.snackBarService.showSnackBar(err.error.message, 4000, 'end', 'top');
        }, 
        complete: () => this.snackBarService.showSnackBar('Tarefa criada com sucesso!', 4000, 'end', 'top')
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