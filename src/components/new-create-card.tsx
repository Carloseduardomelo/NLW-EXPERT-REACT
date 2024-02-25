import * as dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";

export const NewCreateCard = () => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [valuesTextArea, setValuesTextArea] = useState("");

  const handleStartEditor = () => {
    setShouldShowOnboarding(false);
  };

  const handleContentChanged = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.value == "") {
      setShouldShowOnboarding(true);
    }

    setValuesTextArea(event.target.value);
  };

  const handleSaveNote = (event: FormEvent) => {
    event.preventDefault();
    setShouldShowOnboarding(true);
    console.log(valuesTextArea);
    setValuesTextArea("");
  };

  return (
    <dialog.Root>
      <dialog.Trigger className="flex flex-1 flex-col gap-3 rounded-md text-left bg-slate-800 p-5 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>

        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </dialog.Trigger>
      <dialog.Portal>
        <dialog.Overlay className="fixed inset-0 bg-black/50" />
        <dialog.Content className=" z-50 fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <dialog.Close className="absolute right-0 top-0 p-1.5 outline-none focus-visible:ring-2 ring-slate-800">
            <X className="w-6 h-6 text-slate-400 hover:text-slate-100" />
          </dialog.Close>
          <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button className="font-medium text-lime-400 hover:underline focus-visible:outline-none focus-visible:underline">
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline focus-visible:outline-none focus-visible:underline"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <>
                  <textarea
                    autoFocus
                    className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                    onChange={handleContentChanged}
                  />
                  <button
                    type="submit"
                    className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
                  >
                    Salvar nota
                  </button>
                </>
              )}
            </div>
          </form>
        </dialog.Content>
      </dialog.Portal>
    </dialog.Root>
  );
};
