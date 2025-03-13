import Image from "next/image";
import AddNewTask from "./AddNewTask";

const EmptyState = ({ status }: { status: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-14">
      <Image src="/empty-state.svg" alt="" width={200} height={200} />
      <p className="text-lg font-medium capitalize">
        No {status !== "all" && status} task {status === "all" && "yet"}!
      </p>
      {status === "all" && <AddNewTask />}
    </div>
  );
};

export default EmptyState;
