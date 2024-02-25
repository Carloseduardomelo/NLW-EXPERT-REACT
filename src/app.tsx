import logo from "./assents/logo-nlw-expert.svg";
import { NewCreateCard } from "./components/new-create-card";
import { NoteCard } from "./components/noteCard";

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="logo nlw expert" />

      <form>
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full rounded-lg bg-transparent outline-none text-3xl placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-600" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewCreateCard />
        <NoteCard
          note={{
            date: new Date(),
            context: "ola mundo",
          }}
        />
      </div>
    </div>
  );
}
