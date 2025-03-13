import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { task } from "@/lib/types";
import { Check } from "lucide-react";
import useTaskStore from "./tasks-store";

const MarkCompleted = ({ task }: { task: task }) => {
  const { tasks, setTasks } = useTaskStore();

  const markHasCompleted = () => {
    if (!tasks) return;
    if (task.status === "active") {
      const updatedTasks: task[] = tasks.map((prevTasks) => {
        return prevTasks.id === task.id
          ? {
              ...prevTasks,
              status: "completed",
            }
          : prevTasks;
      });
      setTasks(updatedTasks);
    } else {
      const updatedTasks: task[] = tasks.map((prevTasks) => {
        return prevTasks.id === task.id
          ? {
              ...prevTasks,
              status: "active",
            }
          : prevTasks;
      });
      setTasks(updatedTasks);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className="cursor-pointer w-5 h-5 rounded-sm border border-blue-950 flex justify-center items-center"
            onClick={markHasCompleted}
          >
            {task.status === "completed" && (
              <div className="w-4 h-4 rounded-sm bg-blue-950 flex justify-center items-center text-white">
                <Check size={14} />
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>Mark as Completed</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MarkCompleted;
