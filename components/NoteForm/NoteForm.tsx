import css from "./NoteForm.module.css";
import { Form, Formik, Field, ErrorMessage } from "formik";
import type { NewNote } from "@/types/note";
import { createNote } from "@/lib/api";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface OrderFormValues {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProp {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProp) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (value: NewNote) => createNote(value),
    onSuccess: () => {
      toast.success("Note created successfully");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["noteTag"] });
    },
    onError: () => toast.error("something happened"),
  });

  function createNewNote(
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) {
    mutation.mutate(values as NewNote);
    actions.resetForm();
  }

  const OrderFormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name is too long")
      .required("Title is required"),
    content: Yup.string().max(500, "Content is too long"),
    tag: Yup.string()
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
      .required("You need to select a tag"),
  });

  return (
    <>
      <Formik
        initialValues={{ title: "", content: "", tag: "" }}
        validationSchema={OrderFormSchema}
        onSubmit={createNewNote}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="">---</option>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              onClick={onClose}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={css.submitButton}>
              Create note
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
