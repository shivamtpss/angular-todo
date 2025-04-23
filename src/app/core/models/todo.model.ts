export interface Todo{
    id: number;
    title: string;
    completed: boolean;
    userId ?: number;
    createdAt ?: Date;
    updatedAt ?: Date;
    deletedAt ?: Date;
}