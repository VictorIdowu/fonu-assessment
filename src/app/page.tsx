"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GridIcon, RowsIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("all");
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
          <Button>Add Task</Button>
        </header>
        <Tabs defaultValue="grid">
          <div className="flex justify-between items-center gap-1 mt-6">
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
              <SelectTrigger className="w-[180px] cursor-pointer">
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
          <TabsContent value="grid">Grid View</TabsContent>
          <TabsContent value="table">Table View</TabsContent>
        </Tabs>
      </main>
      <footer className="bg-gray-600/75 p-4 text-[#eee]">
        <div className="max-w-4xl mx-auto">
          <p>Created by Victor</p>
        </div>
      </footer>
    </div>
  );
}
