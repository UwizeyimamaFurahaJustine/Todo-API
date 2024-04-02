import { Request, Response } from "express";
import { Todo } from "../models/todo";


export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

export const addTodos = async (req: Request, res: Response) => {
    const todo = new Todo({
        title: req.body.title
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err:any) {
        res.status(400).json({ message: err.message });
    }
};

export const updateTodos = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, { completed: req.body.completed }, { new: true });
        res.json(todo);
    } catch (err) {
        res.status(404).json({ message: 'Todo not found' });
    }
};

export const deleteTodos = async (req: Request, res: Response) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted'});
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
