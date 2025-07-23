import { Box, Button, Checkbox, Input, Typography, Tooltip, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, firestoreDb } from "../config/firebase";
import { getDocs, addDoc, collection, deleteDoc, doc } from "firebase/firestore"

interface TodoFormData {
    task: string;
    userId: string;
    completed: boolean;
}

export const Todo = () => {
    const schema = yup.object().shape({
        task: yup.string().required("Task is required").max(50, "Task must be at most 50 characters long"),
        userId: yup.string().optional().default(auth.currentUser?.uid || "unknown"),
        completed: yup.boolean().optional().default(false),
    });

    const [taskArr, setTaskArr] = useState([] as any[]);

    const { control, register, handleSubmit, formState: { errors } } = useForm<TodoFormData>({
        resolver: yupResolver(schema),
    });

    const todosCollection = collection(firestoreDb, "todos");

    const getTodoList = async () => {
        const querySnapshot = await getDocs(todosCollection);
        const todos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTaskArr(todos as any[]);
        console.log("Todos fetched:", todos);
    };

    const onAdd = async (data: TodoFormData) => {
        const newTask = {
            task: data.task,
            userId: auth.currentUser?.uid || "unknown",
            completed: false,
        };
        setTaskArr([...taskArr, newTask]);

        await addDoc(todosCollection, newTask);
        console.log("Submitted data:", newTask);
    };

    const onDelete = async (id: string) => {
        // Delete the task from taskArr based on its id
        setTaskArr((prevTasks) => prevTasks.filter((t) => t.id !== id));
        // Delete the task from Firestore
        await deleteDoc(doc(todosCollection, id)).then(() => {
            // add mui snackbar and show success message and must be on top right corner
            <Snackbar
                open={true}
                autoHideDuration={6000}
                onClose={() => {}}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                message={`Task deleted: ${id}`}
            />
            console.log("Task deleted:", id);
        }).catch((error) => {
            console.error("Error deleting task:", error);
        });
    };

    useEffect(() => {
        getTodoList();
    }, []);

    return (
        <Box>
            <Typography variant="h4">Todo</Typography>
            <form onSubmit={handleSubmit(onAdd)}>
                <Box sx={{ width: "500px", display: "flex", flexDirection: "row", gap: 2, alignContent: "center", alignItems: "center" }}>
                    <Input
                        {...register("task")}
                        placeholder="Add a new task"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        inputProps={{ style: { fontSize: "1.25rem" } }}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ height: 25, width: 90, borderRadius: 1 }}>Add</Button>
                </Box>
                {errors.task && (
                    <Typography variant="h6" color="error" sx={{ mt: -2, mb: 2 }}>{errors.task.message}</Typography>
                )}
            </form>

            <Box>
                {taskArr.map((todo) => (
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
                            onChange={() => {
                                setTaskArr((prevTasks) =>
                                    prevTasks.map((t) =>
                                        t.id === todo.id ? { ...t, completed: !t.completed } : t
                                    )
                                );
                            }}
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

        </Box >
    );
}

export default Todo;