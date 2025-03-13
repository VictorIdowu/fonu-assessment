import { task } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { format } from "date-fns";
import DeleteTask from "./DeleteTask";
import MarkCompleted from "./MarkCompleted";

const TaskCard = ({ task }: { task: task }) => {
  const IsOverdue = (date: Date) => {
    return new Date(date).getTime() <= new Date().getTime();
  };

  return (
    <Card
      className={`relative ${
        task.status === "active" && task.date && IsOverdue(task.date)
          ? "shadow-red-600"
          : ""
      }`}
    >
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex flex-col">{task.title}</CardTitle>
        <MarkCompleted task={task} />
      </CardHeader>
      <CardContent className="text-sm text-gray-700 flex flex-col gap-3 justify-between">
        <p className="h-20">{task.description}</p>
        <p className="text-xs text-gray-700 font-medium">
          <span className="text-gray-500">Due Date: </span>
          {task.date && format(task.date, "PPP")}
        </p>
      </CardContent>
      <CardFooter className="text-sm text-gray-700 flex justify-between items-center">
        <p className="flex gap-2 items-center text-xs">
          <span
            className={`rounded-lg py-1 px-2 capitalize ${
              task.status === "active"
                ? "text-green-600 border-green-600 bg-green-600/15"
                : task.status === "completed"
                ? "text-blue-600 border-blue-600 bg-blue-600/15"
                : ""
            }`}
          >
            {task.status}
          </span>
          {task.status === "active" && task.date && IsOverdue(task.date) && (
            <span className="rounded-lg py-1 px-2 capitalize text-red-600 border-red-600 bg-red-600/15">
              Overdue
            </span>
          )}
        </p>
        <DeleteTask task={task} />
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
