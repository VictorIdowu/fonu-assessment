"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GridIcon, LoaderCircle, RowsIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import useTaskStore from "@/components/tasks-store";
import EmptyState from "@/components/EmptyState";
import AddNewTask from "@/components/AddNewTask";
import TaskCard from "@/components/TaskCard";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TaskRow from "@/components/TaskRow";
import { task } from "@/lib/types";

export default function Home() {
  const { isInitialised, setIsInitialised, tasks } = useTaskStore();
  const [status, setStatus] = useState("all");
  const [data, setData] = useState<task[] | []>([]);

  useEffect(() => {
    if (!tasks) return;

    const filteredTasks =
      status === "all" ? tasks : tasks.filter((task) => task.status === status);

    const sortedTasks = filteredTasks.sort(
      (a, b) =>
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );

    setData(sortedTasks);
  }, [tasks, status]);

  useEffect(() => {
    setIsInitialised(true);
  }, [setIsInitialised]);

  const tabTriggers = [
    { text: "Grid", val: "grid", icon: <GridIcon size={16} /> },
    { text: "Table", val: "table", icon: <RowsIcon size={16} /> },
  ];

  const filterStatus = [
    { text: "All", val: "all" },
    { text: "Active", val: "active" },
    { text: "Completed", val: "completed" },
  ];

  return (
    <div className="oxanium">
      <main className="max-w-4xl p-6 mx-auto">
        <header className="flex justify-between items-center gap-1">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <AddNewTask />
        </header>
        <Tabs defaultValue="grid" className="mb-20">
          <div className="flex flex-col-reverse sm:flex-row justify-between sm:items-center gap-6 mt-6">
            <TabsList className="grid w-full grid-cols-2 max-w-[170px]">
              {tabTriggers.map((trigger, i) => (
                <TabsTrigger
                  key={i}
                  value={trigger.val}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {trigger.icon}
                  {trigger.text}
                </TabsTrigger>
              ))}
            </TabsList>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:w-[180px] cursor-pointer">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {filterStatus.map((state, i) => (
                    <SelectItem
                      key={i}
                      value={state.val}
                      className="cursor-pointer"
                    >
                      {state.text}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <TabsContent value="grid" className="mt-4">
            {data && data.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data?.map((task) => (
                  <TaskCard task={task} key={task.id} />
                ))}
              </div>
            ) : (
              <>
                {isInitialised ? (
                  <EmptyState status={status} />
                ) : (
                  <div className="flex justify-center items-center mt-20">
                    <LoaderCircle size={50} className="animate-spin" />
                  </div>
                )}
              </>
            )}
          </TabsContent>
          <TabsContent value="table" className="mt-4">
            {data && data.length ? (
              <Table className="min-w-3xl">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="w-[50px] text-right">
                      Delete
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((task) => (
                    <TaskRow task={task} key={task.id} />
                  ))}
                </TableBody>
              </Table>
            ) : (
              <>
                {isInitialised ? (
                  <EmptyState status={status} />
                ) : (
                  <div className="flex justify-center items-center mt-20">
                    <LoaderCircle size={50} className="animate-spin" />
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <footer className="bg-gray-600/75 p-4 text-[#eee] fixed bottom-0 right-0 left-0">
        <div className="max-w-4xl mx-auto">
          <p>Created by Victor</p>
        </div>
      </footer>
    </div>
  );
}
