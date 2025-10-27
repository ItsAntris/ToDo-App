import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../../services/task.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input() tasks: Task[] = [];

  @Output() add = new EventEmitter<Task>();
  @Output() toggle = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();

  newTask: Task = {title: '', description: '', completed: false};
  
  addTask(): void {
      if (!this.newTask.title.trim()) return;
      this.add.emit(this.newTask);
      this.newTask = {title: '', description: '', completed: false};
    }

  toggleTask(task: Task): void {
    this.toggle.emit(task);
  }

  editTask(task: Task): void {
  this.edit.emit(task);
  }

  deleteTask(id?: number): void {
    if (id) this.delete.emit(id);
  }
}
