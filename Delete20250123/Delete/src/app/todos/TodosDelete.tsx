'use client';

import { useState, useRef } from "react";
import ModalDialog from "@/app/components/ModalDialog";
import { TodoItem } from "@/app/types/TodoItem";
import { axiosInstance } from "@/app/utils/apiClient";

interface TodosDeleteProps {
    todo: TodoItem;
    onCancel: () => void;
    onDeleted: () => void;
    onError: (message: string) => void;
}

export default function TodosDelete({ todo, onCancel, onDeleted, onError }: TodosDeleteProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const deleteTasksRef = useRef<HTMLInputElement>(null);

    async function handleDelete() {
        setIsDeleting(true);
        const deleteTasks = deleteTasksRef.current?.checked ?? false;
        try {
            const response = await axiosInstance.delete(`/api/TodoItems/${todo.guid}?deleteTasks=${deleteTasks}`);
            if (response.status === 204) {
                onDeleted();
            }
        } catch (error: any) {
            onError(error.response?.data?.message || "Fehler beim Löschen des Todo-Items.");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <ModalDialog title={`Todo '${todo.title}' löschen?`} onOk={handleDelete} onCancel={onCancel}>
            <p>Möchtest du das Todo wirklich löschen?</p>
            <label>
                <input type="checkbox" ref={deleteTasksRef} />
                Verbundene Tasks ebenfalls löschen
            </label>
            {isDeleting && <p>Löschen...</p>}
        </ModalDialog>
    );
}