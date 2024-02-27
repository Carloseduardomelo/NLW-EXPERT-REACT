import * as dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { CreateNotes } from "../uteis/creataNote";

interface OncreateNote {
  OncreateNote: (context: string) => void;
}

export const NewCreateCard = ({ OncreateNote }: OncreateNote) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [valuesTextArea, setValuesTextArea] = useState<string>("");
  const [isRecord, setIsRecord] = useState(false);
  const SpeechRecognitionAPI =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const speechRecognition = new SpeechRecognitionAPI();
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
    if (valuesTextArea == "") {
      toast.info("Preencha o campo antes de salvar");
      return;
    } else {
      setShouldShowOnboarding(true);
      setValuesTextArea("");
      toast.success("Nota criada com sucesso!");
      OncreateNote(valuesTextArea);
      setIsRecord(false);
    }

    CreateNotes(valuesTextArea);
  };

  const StartRecord = () => {
    setIsRecord(true);
    setShouldShowOnboarding(false);

    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      alert("Infelizmente seu navegador não suporta a API de gravação!");
      return;
    }

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setValuesTextArea(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  };
  const SpotRecord = () => {
    setIsRecord(false);
    speechRecognition.stop();
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
          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button
                    className="font-medium text-lime-400 hover:underline focus-visible:outline-none focus-visible:underline"
                    onClick={StartRecord}
                  >
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline focus-visible:outline-none focus-visible:it underline"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <>
                  <textarea
                    autoFocus
                    value={valuesTextArea}
                    className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                    onChange={handleContentChanged}
                  />
                  {isRecord ? (
                    <button
                      onClick={SpotRecord}
                      type="button"
                      className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
                    >
                      <div className="size-3 rounded-full bg-red-500 animate-pulse " />
                      Gravando... (clique p/ interromper)
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveNote}
                      type="button"
                      className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
                    >
                      Salvar nota
                    </button>
                  )}
                </>
              )}
            </div>
          </form>
        </dialog.Content>
      </dialog.Portal>
    </dialog.Root>
  );
};
