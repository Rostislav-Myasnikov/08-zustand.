import { Metadata } from "next";
import CreateNoteClient from "./createNote.client";

export const metadata: Metadata= {
  title: "Create form",
  description: "Create form for new note",
  openGraph: {
    title:"Create form",
    description: "Create form for new note",
    url: "/note",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub",
      },
    ],
    type: "article",
  }
}

export default function CreateNote() {
  return <CreateNoteClient />;
}
