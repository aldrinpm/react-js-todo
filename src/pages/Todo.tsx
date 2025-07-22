import { Box, Button, Checkbox, Input, Typography, Tooltip } from "@mui/material";
import { useState } from "react";

export const Todo = () => {
    const initialTasks = [
        { id: 1, userId: 1, completed: true, task: "Wash the car" },
        { id: 2, userId: 1, completed: false, task: "Clean the house" },
        { id: 3, userId: 1, completed: false, task: "Do the laundry" },
        { id: 4, userId: 1, completed: true, task: "Buy groceries asdfas dfasdf asd fasd fas dfasd f" },
    ];

    const [taskArr, setTaskArr] = useState(initialTasks);

    return (
        <Box>
            <h1>Todo</h1>
            <Box sx={{ width: "500px", display: "flex", flexDirection: "row", gap: 2, marginBottom: 2, alignContent: "center" , alignItems: "center" }}>
                <Input placeholder="Add a new task" fullWidth sx={{ marginBottom: 2 }} />
                <Button variant="contained" color="primary" sx={{ height: 25, width: 90, borderRadius: 1 }}>Add </Button>
            </Box>

            <Box>
                {taskArr.map((todo) => (
                    <Box
                        key={todo.id}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: "#44cf0dff",
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
                            onChange={() => {
                                setTaskArr((prevTasks) =>
                                    prevTasks.map((t) =>
                                        t.id === todo.id ? { ...t, completed: !t.completed } : t
                                    )
                                );
                            }}
                        />
                        <Typography variant="h6" sx={{ mr: 2 }}>
                            {todo.task}
                        </Typography>
                        <Tooltip title="Delete" placement="top" arrow>
                            <Button
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

        </Box>
    );
}