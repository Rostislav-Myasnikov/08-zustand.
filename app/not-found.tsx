import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Note Hub not-found",
  description: "This page is not found in Note Hub",
  openGraph: {
    title: "Not found page",
    description: "This page is not found",
    url: "https://06-notehub-nextjs-inky-beta.vercel.app/asdas",
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
        height: 630,
        alt: "Note Hub",
    }],
    type: "article"
  }
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
