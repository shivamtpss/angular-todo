import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "input-submit",
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="input-group">
            <input type="text" [(ngModel)]="value" [placeholder]="placeholder" />
            <button (click)="submit()">{{btnName}}</button>
        </div>
    `,
    styles: [`
        .input-group {
            display: flex;
            gap: 10px;
            margin: 10px 0;
        }

        input {
            flex: 1;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            font-size: 1rem;
        }

        button {
            padding: 10px 16px;
            border: none;
            border-radius: 8px;
            background-color: #3b82f6;
            color: #fff;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        button:hover {
            background-color: #2563eb;
        }
    `]
})
export class TodoInputComponent {
    value = '';
    @Input() placeholder = 'Enter Something...';
    @Input() btnName = 'Submit';
    @Output() submitTodo = new EventEmitter<string>();

    submit() {
        const trimmed = this.value.trim();
            this.submitTodo.emit(trimmed);
    }
    clear(){
        this.value = '';
    }
}
