"use client";
import {
  CloseButton,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

export function TaskList() {
  const tasks = [
    <div key="1" className="w-50 p-4 border-4 box-border">
      task1
    </div>,
    <div key="2" className="w-50 p-2" />,
  ];
  for (let i = 2; i < 10; i++) {
    tasks.push(
      <div key={2 * i + 1} className="w-50 p-4 border-4 box-border">
        task{i}
      </div>,
      <div key={2 * i} className="w-50 p-2" />
    );
  }

  return (
    <>
      <div className="flex flex-col overflow-scroll flex-grow">
        {tasks}
        <button
          className="w-50 p-4 border-4 box-border text-left"
          onClick={() =>
            (
              document.getElementById("my_modal_1")! as HTMLDialogElement
            ).showModal()
          }
        >
          &#9971; Add task
        </button>
        {/* Replace this modal with headlessUI + DaisyUI styling */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
            </div>
            <h3 className="font-bold text-lg">Add a new task &#128507;</h3>
            <div className="p-2" />
            <div className="flex justify-center items-center">
              <input
                type="text"
                placeholder="Going for a walk"
                className="input input-bordered input-primary w-full max-w-xs"
              />
              <div className="p-1" />
              <button className="btn btn-primary">Add</button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}
