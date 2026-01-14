"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import { Toaster } from "react-hot-toast";
import Pagination from "@/components/Pagination/Pagination";
import AddNoteModal from "@/components/AddNoteModal/AddNoteModal";
import css from "@/app/notes/notes.module.css";

type Prop = {
  tag?: string;
};

export default function NoteFilterClient({ tag }: Prop) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isModal, setIsModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["noteTag", tag, query, page],
    queryFn: () =>
      fetchNotes({
        tag,
        query,
        page,
      }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            setQuery={(value) => {
              setQuery(value);
              setPage(1);
            }}
          />
          {data && data?.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              page={page}
              setPage={setPage}
            />
          )}
          <button onClick={() => setIsModal(true)} className={css.button}>
            Create note +
          </button>
        </header>
        {data && <NoteList data={data?.notes} />}
      </div>
      {isModal && <AddNoteModal closeModal={() => setIsModal(false)} />}
      <Toaster />
    </>
  );
}
