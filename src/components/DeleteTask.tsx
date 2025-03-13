import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { task } from "@/lib/types";
import { Trash2Icon } from "lucide-react";
import useTaskStore from "./tasks-store";

const DeleteTask = ({ task }: { task: task }) => {
  const { tasks, setTasks } = useTaskStore();

  const deleteTask = () => {
    if (!tasks) return;
    const newTasks = tasks.filter((prevTask) => prevTask.id !== task.id);
    setTasks(newTasks);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer">
        <Trash2Icon size={20} className="text-gray-600" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the task from the task list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteTask}>
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTask;
