import * as dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface NoteCArdProps {
  note: {
    id: string;
    date: Date;
    context: string;
  };
}

export function NoteCard({ note }: NoteCArdProps) {
  return (
    <dialog.Root>
      <dialog.Trigger className="flex flex-1 flex-col gap-3 rounded-md text-left bg-slate-800 p-5 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <button className="flex flex-1 flex-col gap-3">
          <span className="text-sm font-medium text-slate-300">
            {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
          </span>

          <p className="text-sm text-slate-400 overflow-hidden text-nowrap text-ellipsis">
            {note.context}
          </p>

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
        </button>
      </dialog.Trigger>
      <dialog.Portal>
        <dialog.Overlay className="fixed inset-0 bg-black/50" />
        <dialog.Content className=" z-50 fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <dialog.Close className="absolute right-0 top-0 p-1.5">
            <X className="w-6 h-6 text-slate-400 hover:text-slate-100" />
          </dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-10">
            <span>
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <span className="text-sm text-slate-400">{note.context}</span>
          </div>

          <button
            type="button"
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
          >
            Deseja{" "}
            <span className="text-red-400 group-hover:underline">
              apagar essa nota
            </span>
            ?
          </button>
        </dialog.Content>
      </dialog.Portal>
    </dialog.Root>
  );
}
