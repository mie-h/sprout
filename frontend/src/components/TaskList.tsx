"use client";

export function TaskList({
  tasks,
}: {
  tasks: { id: number; title: string }[];
}) {
  const taskDivs = tasks.flatMap(({ title }, i) => {
    const result =
      i === 0 ? [] : [<div key={2 * i - 1} className="w-50 p-2" />];

    result.push(
      <div key={2 * i} className="w-50 p-4 border-4 box-border">
        {title}
      </div>
    );

    return result;
  });

  return (
    <>
      <div className="flex flex-col overflow-scroll flex-grow">
        {taskDivs}
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
