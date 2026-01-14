import { fetchNotes } from "@/lib/api";
import NoteFilterClient from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Prop = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesFilterPage({ params }: Prop) {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["noteTag", category],
    queryFn: () =>
      fetchNotes({
        tag: category,
        page: 1,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteFilterClient tag={category} />
    </HydrationBoundary>
  );
}
