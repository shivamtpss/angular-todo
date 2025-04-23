import { Component, inject, Input } from "@angular/core";
import { Todo } from "../../core/models/todo.model";
import { TodoService } from "./todos-service";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCoffee,faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-todo-item',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule],
    template: `
        <div class="todo-item">
            <div class="todo-details">
                <p class="todo-title">{{todo.title}}</p>
                <p class="todo-status" [class.completed]="todo.completed">{{todo.completed ? "Completed" : "Pending"}}</p>
            </div>
            <button class="status-btn" (click)="onStatusChange()">
                <fa-icon [icon]="!todo.completed ? faCircleCheck : faCircleXmark"
                         [style.color]="todo.completed ? '#f87171' : '#34d399'">
                </fa-icon>
            </button>
        </div>
    `,
    styles: [`
        .todo-item {
            background: #f9fafb;
            padding: 12px 16px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background 0.2s;
        }

        .todo-item:hover {
            background: #f3f4f6;
        }

        .todo-details {
            display: flex;
            flex-direction: column;
        }

        .todo-title {
            margin: 0;
            font-weight: 500;
            color: #1f2937;
        }

        .todo-status {
            margin: 0;
            font-size: 0.875rem;
            color: #9ca3af;
        }

        .todo-status.completed {
            color: #10b981;
        }

        .status-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
        }
    `]
})


export class TodoItem{
private todoService = inject(TodoService);
@Input() todo!:Todo ;
faCoffee = faCoffee;
faCircleCheck = faCircleCheck;
faCircleXmark=faCircleXmark;
onStatusChange(){
this.todoService.toggleTodo(this.todo.id)
}

}