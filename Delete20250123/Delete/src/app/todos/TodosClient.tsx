'use client';

import { useState } from "react";
import { TodoItem } from "../types/TodoItem";
import { Category } from "../types/Category";
import TodosDelete from "./TodosDelete";
import styles from "./style.module.css";

interface Props {
    todoItems: TodoItem[];
    categories: Category[];
}

export default function TodosClient({ todoItems, categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [deleteTodo, setDeleteTodo] = useState<TodoItem | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const filteredTodoItems = selectedCategory
        ? todoItems.filter(item => item.categoryName === selectedCategory)
        : todoItems;

    return (
        <div className={styles.categories}>
            <h1>Todo Liste</h1>
            {errorMessage && <div className="errorbox">{errorMessage}</div>}
            <select onChange={handleCategoryChange}>
                <option value="">Alle Kategorien</option>
                {categories.map(category => (
                    <option key={category.guid} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
            <ul>
                {filteredTodoItems.map(item => (
                    <li key={item.guid} className={
                        new Date(item.dueDate) < new Date() ? styles.overdue : styles.onTime
                    }>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>Kategorie: {item.categoryName} (GUID {item.categoryGuid})</p>
                        <p>Fällig am: {new Date(item.dueDate).toLocaleDateString()}</p>
                        <p>Status: {item.isCompleted ? "Abgeschlossen" : "Ausstehend"}</p>
                        <button onClick={() => setDeleteTodo(item)}>Löschen</button>
                    </li>
                ))}
            </ul>
            {deleteTodo && (
                <TodosDelete
                    todo={deleteTodo}
                    onCancel={() => setDeleteTodo(null)}
                    onDeleted={() => {
                        setDeleteTodo(null);
                        // Hier könnte ein API-Refetch oder ein State-Update erfolgen
                    }}
                    onError={(message) => setErrorMessage(message)}
                />
            )}
        </div>
    );
}