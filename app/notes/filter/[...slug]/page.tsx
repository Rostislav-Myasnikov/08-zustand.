import { fetchNotes } from "@/lib/api";
import NoteFilterClient from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

type Prop = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({params}: Prop): Promise<Metadata> {

  const {slug} = await params;
  const category = slug[0];

  return {
    title: `List of notes`,
    description: `Notes by tag: ${category}`,
    openGraph: {
      title: `Notes by ${category}`,
      description: `List of notes by ${category}`,
      url: 'https://06-notehub-nextjs-inky-beta.vercel.app/notes',
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `List of ${category}`
        },
      ],
      type: "article",
    }
  }
}

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
