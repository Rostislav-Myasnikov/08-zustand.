"use client";

import css from "./NoteForm.module.css";
import type { NewNote } from "@/types/note";
import { createNote } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNoteStore } from "@/lib/store/noteStore";

interface Prop {
  handleBack: () => void;
}

export default function NoteForm({ handleBack }: Prop) {
  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (value: NewNote) => createNote(value),
    onSuccess: () => {
      toast.success("Note created successfully");
      queryClient.invalidateQueries({ queryKey: ["noteTag"] });
      clearDraft();
      handleBack();
    },
    onError: () => toast.error("something happened"),
  });

  const formAction = (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as string;

    if (!title || title.length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }

    if (!tag) {
      toast.error("Please select a tag");
      return;
    }

    mutation.mutate({ title, content, tag });
  };

  return (
    <form className={css.form} action={formAction}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          required
          minLength={3}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
          required
        >
          <option value="">---</option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" onClick={handleBack} className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
