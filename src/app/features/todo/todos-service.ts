import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "../../core/models/todo.model";

@Injectable({
    providedIn: 'any'
})
export class TodoService{
    private todoSubject = new BehaviorSubject<Todo[]>([]);
    todos$ = this.todoSubject.asObservable();
    private todos: Todo[] = [];
    private allTodos: Todo[] = [];
    private currentId = 0;
    private currentTitle: string = '';
    private currentCompleted?: boolean;


    addTodo(title: string): void {
        const newTodo: Todo = {
            id: this.currentId++,
            title,
            completed: false,
            createdAt: new Date(),
        };
        this.allTodos.push(newTodo);
        this.applyCurrentFilters()
    }
    removeTodo(id: number): void {
        this.todos = this.allTodos.filter(todo => todo.id !== id);
        this.applyCurrentFilters();
           }
    toggleTodo(id: number): void {
        const todo = this.allTodos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.applyCurrentFilters();
        }
    }

    private applyCurrentFilters():void{
        this.searchFilter(this.currentTitle,this.currentCompleted)
    }
    getTodos(): Todo[] {
        return this.todos;
    }

    searchFilter(title?: string, completed?: boolean): void {
        this.currentTitle = title || '';
        this.currentCompleted = completed;
        
        this.todos = this.allTodos.filter(todo => {
        console.log(title, completed);
          const matchesTitle = title ? todo.title.toLowerCase().includes(title.toLowerCase()) : true;
          const matchesCompleted = typeof completed === 'boolean' ? todo.completed === completed : true;
          return matchesTitle && matchesCompleted;
        });
        this.todoSubject.next(this.todos);
      }
      
    getTodoById(id: number): Todo | undefined {
        return this.todos.find(todo => todo.id === id);
    }
    updateTodo(id: number, title: string): void {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.title = title;
            this.applyCurrentFilters();
        }
    }
    clearCompleted(): void {
        this.todos = this.allTodos.filter(todo => !todo.completed);
        this.todoSubject.next(this.todos);
    }
}