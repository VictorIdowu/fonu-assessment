import useTaskStore from "./tasks-store";
import TaskCard from "./TaskCard";

const GridView = () => {
  const { tasks } = useTaskStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {tasks?.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
};

export default GridView;
