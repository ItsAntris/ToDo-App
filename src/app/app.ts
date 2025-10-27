import { Component, signal } from '@angular/core';
import { TasksComponent } from "./components/tasks/tasks.component";
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialog } from './components/edit-task-dialog/edit-task-dialog';
import { TaskService } from './services/task.service';
import { Task } from './models/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [TasksComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-frontend');
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(task: Task): void {
    this.taskService.createTask(task).subscribe(() => this.getTasks());
  }

  toggleTask(task: Task): void {
    this.taskService.updateTask(task.id!, task).subscribe(() => {
      this.getTasks();
    });
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialog, {
      width: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(result.id!, result).subscribe(() => {
          this.getTasks();
        });
      }
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.getTasks();
    });
  }
}
