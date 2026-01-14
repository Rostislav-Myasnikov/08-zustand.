import NoteDatailsClient from "./NoteDetails.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({params}:Props): Promise<Metadata> {
  
  const {id} = await params;
  const note = await fetchNoteById(id);

  return {
    title: `Note: ${note.title}`,
    description: `Get single note: ${note.title}`,
    openGraph: {
      title: `Note: ${note.title}`,
      description: `Get single note: ${note.title}`,
      url: 'https://06-notehub-nextjs-inky-beta.vercel.app/notes/cmjmmfnzf1jnsyy8uq8fuv4wy',
      images: [
        {
          url:"https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Note: ${note.title}`
        },
      ],
      type: "article",
    }
  }
}

export default async function NoteDetails({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDatailsClient />
    </HydrationBoundary>
  );
}
