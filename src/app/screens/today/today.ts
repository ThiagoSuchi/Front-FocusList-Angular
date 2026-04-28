import { Component, inject } from '@angular/core';
import { Title } from "../../components/shared/title/title";
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-today',
  imports: [Title],
  templateUrl: './today.html',
  styleUrl: './today.css',
})
export class Today {
  readonly taskService = inject(TaskService);

  postTask(event: Event, valueInput: HTMLInputElement) {
    event.preventDefault();

    const inputElement = valueInput;

    const title = inputElement.value.trim();
    if (!title) return;

    this.taskService.postTask(title);
    inputElement.value = '';
  }
}
