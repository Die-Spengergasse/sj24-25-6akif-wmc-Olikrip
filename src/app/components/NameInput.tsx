"use client";

import { useState } from "react";
import ModalDialog from "./ModalDialog";
import { useTodoAppState } from "../context/TodoAppContext";

export default function NameInput() {
    const { activeUser, actions } = useTodoAppState();
    const [username, setUsername] = useState("");

    if (activeUser !== null) return null;

    const handleOk = () => {
        actions.setActiveUser(username.trim() || "Guest");
    };

    const handleCancel = () => {
        actions.setActiveUser("Guest");
    };

    return (
        <ModalDialog title="Willkommen! Bitte Namen eingeben:" onOk={handleOk} onCancel={handleCancel}>
            <input
                type="text"
                value={username}
                placeholder="Dein Name"
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "100%", padding: "0.5rem" }}
            />
        </ModalDialog>
    );
}