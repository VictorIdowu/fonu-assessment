"use client";
import { Loader2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useTaskStore from "./tasks-store";
import { v4 as uuidv4 } from "uuid";
import { task } from "@/lib/types";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type FormType = {
  title: string;
  description: string;
  date: Date | undefined;
};

const AddNewTask = () => {
  const { setTasks, tasks } = useTaskStore();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const formInit = {
    title: "",
    description: "",
    date: undefined,
  };
  const [form, setForm] = useState<FormType>(formInit);

  const submitDisabled =
    loading ||
    !form.title ||
    !form.date ||
    form.title.length >= 20 ||
    form.description.split(" ").length >= 15;

  const addTask: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!form.title || form.date === undefined) return;
    setLoading(true);
    const uniqueId = uuidv4();

    const newTask: task = {
      id: uniqueId,
      ...form,
      status: "active",
      dateCreated: new Date(),
    };

    if (tasks) {
      const prevTasks = [...tasks];
      setTasks([...prevTasks, newTask]);
    } else {
      setTasks([newTask]);
    }
    setLoading(false);
    setShowModal(false);
  };

  return (
    <Dialog
      open={showModal}
      onOpenChange={(open) => {
        setShowModal(open);
        setForm(formInit);
      }}
    >
      <DialogTrigger asChild>
        <Button className="flex items-center w-full xs:w-fit gap-1 !px-6 !py-5">
          <Plus size={16} /> Add Task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>{""}</DialogDescription>
          <form onSubmit={addTask} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col w-full gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter Title"
                value={form.title}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, title: e.target.value }));
                }}
                onKeyDown={(e) => {
                  if (form.title.length >= 20 && e.key != "Backspace") {
                    e.preventDefault();
                  }
                }}
                className={` ${
                  form.title.length >= 20 && "border-red-300 bg-red-200/25"
                }`}
              />
              {form.title.length >= 20 && (
                <p className="text-start text-xs text-red-600">
                  Can enter only a maximum of 20 letters for title
                </p>
              )}
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <Label htmlFor="description" className="flex justify-between">
                Description
                <span>{form.description.split(" ").length - 1 || 0}/15</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe Task"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (
                    form.description.split(" ").length >= 15 &&
                    e.key != "Backspace"
                  ) {
                    e.preventDefault();
                  }
                }}
                className={`h-32 ${
                  form.description?.trim().split(" ").length >= 15 &&
                  "border-red-300 bg-red-200/25"
                }`}
              />
              {form.description.split(" ").length >= 15 && (
                <p className="text-start text-xs text-red-600">
                  Can enter only a maximum of 15 words for description
                </p>
              )}
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <Label htmlFor="description">Due date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full pl-3 text-left font-normal",
                        ${!form.date && "text-muted-foreground"}`}
                  >
                    {form.date ? (
                      format(form.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={form.date}
                    onSelect={(date) => {
                      if (date) {
                        setForm((prev) => ({ ...prev, date: new Date(date) }));
                      }
                    }}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              type="submit"
              disabled={submitDisabled}
              className="flex items-center gap-1"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Add"}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTask;
