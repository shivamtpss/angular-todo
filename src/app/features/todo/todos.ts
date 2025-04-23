import { Component, inject, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TodoInputComponent } from "../../shared/input-submit";
import { AsyncPipe } from "@angular/common";
import { TodoService } from "./todos-service";
import { FormsModule } from "@angular/forms";
import { TodoItem } from "./todo-item";

@Component({
    selector: 'app-todos',
    standalone: true,
    template: `
        <div class="todos-wrapper">
            <h1>Todo List</h1>
            <input-submit #addTodoInput placeholder="Add a todo" (submitTodo)="addTodo($event)" btnName="Add" />

            <div class="filter-bar">
                <input-submit #searchTodoInput placeholder="Search for todos" (submitTodo)="onTitleSubmit($event)" btnName="Search"/>
                <select name="filter" [(ngModel)]="filter" id="filter" (change)="onFilterChange()">
                    <option value="All">All</option>
                    <option value="Uncompleted">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
                <button class="clear_btn" (click)="clearSearch()">Clear</button>
            </div>

            <div *ngIf="(todos$ | async) as todos">
  <div *ngIf="todos.length > 0; else noTodos">
    <div class="todo-list">
      <app-todo-item *ngFor="let todo of todos" [todo]="todo">
      </app-todo-item>
    </div>
  </div>
</div>

<ng-template #noTodos>
  <div class="no-todos-message">No todos found.</div>
</ng-template>


        </div>
    `,
    styles: [`
        .todos-wrapper {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            margin-top: 50px;
        }
        .clear_btn{
            background-color:rgb(223, 211, 211);
            outline: none;
            border: none;
            padding: 10px 16px;
            border-radius:10px;
        }

        h1 {
            text-align: center;
            color: #333;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .filter-bar {
            display: flex;
            width:100%;
            flex-wrap:wrap;
            gap: 10px;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        select {
            padding: 8px 12px;
            border-radius: 8px;
            border: 1px solid #ccc;
        }

        .todo-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .no-todos-message {
        text-align: center;
        margin-top: 40px;
        color: #777;
        font-size: 18px;
    }

    `],
    imports: [CommonModule, TodoInputComponent, AsyncPipe, FormsModule, TodoItem]
})
export class Todos {
    @ViewChild('addTodoInput') addTodoInput!: TodoInputComponent;
    @ViewChild('searchTodoInput') searchTodoInput!: TodoInputComponent;
    private todoService = inject(TodoService);
    todos$ = this.todoService.todos$;
    filter:string = 'All';
    title: string = '';

  addTodo(title: string) {
        this.todoService.addTodo(title);
        this.clearSearch()
    }
    toggleTodo(id: number) {
        this.todoService.toggleTodo(id);
        this.todoService.getTodos()
    }
    onFilterChange() {
        console.log(this.filter);
        const completed = this.getCompletedValue(this.filter);
        this.searchFilter(this.title, completed);
      }

      onTitleSubmit(title: string) {
        this.title = title;
        const completed = this.getCompletedValue(this.filter);
        this.searchFilter(this.title, completed);
      }

      getCompletedValue(filter: string): boolean | undefined {
        if (filter === 'Completed') return true;
        if (filter === 'Uncompleted') return false;
        return undefined; // Means "All" — don't filter by completion
      }
      
      searchFilter(title: string, completed?: boolean) {
        this.todoService.searchFilter(title, completed);
      }

      clearSearch() {
        this.searchTodoInput.clear();
        this.addTodoInput.clear();
        this.filter = "All";
        this.title = "";
        this.searchFilter("", undefined);
    }
}
