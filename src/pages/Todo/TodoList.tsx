import { Box, Button, Checkbox, Typography, Tooltip } from "@mui/material";
import React from "react";

interface TodoItem {
    id: string;
    task: string;
    completed: boolean;
}

interface TodoListProps {
    todos: TodoItem[];
    onUpdate: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
    return (
        <Box>
            {todos.map((todo) => (
                <Box
                    key={todo.id}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "lightGray.main",
                        padding: 2,
                        borderRadius: 1,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        height: "40px",
                        mb: 1,
                    }}
                >
                    <Checkbox
                        checked={todo.completed}
                        onChange={(e) => onUpdate(todo.id, e)}
                    />
                    <Typography variant="h6" sx={{ mr: 2 }}>{todo.task}</Typography>
                    <Tooltip title="Delete" placement="top" arrow>
                        <Button
                            onClick={() => onDelete(todo.id)}
                            variant="contained"
                            color="primary"
                            sx={{
                                ml: "auto",
                                width: "20px",
                                minWidth: "20px",
                                height: 20,
                                borderRadius: 1,
                            }}
                        >
                            &#128465;
                        </Button>
                    </Tooltip>
                </Box>
            ))}
        </Box>
    );
};

export default TodoList;
