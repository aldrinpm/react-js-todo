import { Box, Button, Input, Typography, Snackbar } from "@mui/material";
import TodoList from "./TodoList";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, firestoreDb } from "../../config/firebase";
import { getDocs, addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";
import { Forbidden } from "../Forbidden";

interface TodoFormData {
    task: string;
    userId: string;
    completed: boolean;
}

export const Todo = () => {
    const [user] = useAuthState(auth);
    const schema = yup.object().shape({
        task: yup.string().required("Task is required").max(50, "Task must be at most 50 characters long"),
        userId: yup.string().optional().default(user?.uid || "unknown"),
        completed: yup.boolean().optional().default(false),
    });

    const [taskArr, setTaskArr] = useState([] as any[]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const { register, handleSubmit, formState: { errors }, reset } = useForm<TodoFormData>({
        resolver: yupResolver(schema),
    });

    const todosCollection = collection(firestoreDb, "todos");

    const getTodoList = async () => {
        const querySnapshot = await getDocs(todosCollection);
        const todos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTaskArr(todos as any[]);
    };

    const onAdd = async (data: TodoFormData) => {
        const newTask = {
            task: data.task,
            userId: user?.uid || "unknown",
            completed: false,
        };
        await addDoc(todosCollection, newTask);

        // clear the form
        reset();

        // refetch the todo list
        getTodoList();
    };

    const onDelete = async (id: string) => {
        // Delete the task from taskArr based on its id
        setTaskArr((prevTasks) => prevTasks.filter((t) => t.id !== id));
        // Delete the task from Firestore
        await deleteDoc(doc(todosCollection, id)).then(() => {
            setSnackbarMessage(`Task deleted: ${id}`);
            setSnackbarOpen(true);
        }).catch((error) => {
            console.error("Error deleting task:", error);
        });
    };

    const onUpdate = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        // Update the task in taskArr based on its id
        setTaskArr((prevTasks) =>
            prevTasks.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
        // Update the task in Firestore
        await updateDoc(doc(todosCollection, id), {
            completed: e.target.checked
        }).then(() => {
            setSnackbarMessage(`Task updated: ${id}`);
            setSnackbarOpen(true);
        }).catch((error) => {
            console.error("Error updating task:", error);
        });
    };

    useEffect(() => {
        getTodoList();
    }, []);

    if (!user) {
        return <Forbidden />;
    }

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
                <TodoList todos={taskArr} onUpdate={onUpdate} onDelete={onDelete} />
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                message={snackbarMessage}
            />
        </Box >
    );
}

export default Todo;