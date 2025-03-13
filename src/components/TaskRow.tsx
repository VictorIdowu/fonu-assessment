import { TableRow, TableCell } from "@/components/ui/table";
import { task } from "@/lib/types";
import MarkCompleted from "./MarkCompleted";
import DeleteTask from "./DeleteTask";
import { format } from "date-fns";

const TaskRow = ({ task }: { task: task }) => {
  const IsOverdue = (date: Date) => {
    return new Date(date).getTime() <= new Date().getTime();
  };

  return (
    <TableRow key={task.id}>
      <TableCell className="font-medium">
        <MarkCompleted task={task} />
      </TableCell>
      <TableCell>{task.title}</TableCell>
      <TableCell className="max-w-[200px] truncate">
        {task.description}
      </TableCell>
      <TableCell>
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
      </TableCell>
      <TableCell>{task.date && format(task.date, "PPP")}</TableCell>
      <TableCell className="flex justify-end">
        <DeleteTask task={task} />
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;
