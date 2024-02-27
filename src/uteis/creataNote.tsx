import { db } from "../lib/prisma";

export const CreateNotes = async (text: string) => {
  await db.notes.create({
    data: {
      text,
    },
  });
};
