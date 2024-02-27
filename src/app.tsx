import { ChangeEvent, useState } from "react";
import logo from "./assents/logo-nlw-expert.svg";
import { NewCreateCard } from "./components/new-create-card";
import { NoteCard } from "./components/noteCard";

interface NotesProps {
  id: string;
  date: Date;
  context: string;
}
export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<NotesProps[]>(() => {
    const notesLocalStore = localStorage.getItem("notes");

    if (notesLocalStore) {
      return JSON.parse(notesLocalStore);
    }

    return [];
  });
  const OncreateNote = (context: string) => {
    const notesCreated = [
      { id: crypto.randomUUID(), date: new Date(), context },
      ...notes,
    ];

    setNotes(notesCreated);

    localStorage.setItem("notes", JSON.stringify(notesCreated));
  };

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.context.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="logo nlw expert" />

      <form>
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full rounded-lg bg-transparent outline-none text-3xl placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-600" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewCreateCard OncreateNote={OncreateNote} />
        {filteredNotes.map((note: NotesProps) => {
          return <NoteCard key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}
