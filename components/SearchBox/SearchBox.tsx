import { useDebouncedCallback } from "use-debounce";

interface SearchBoxProp {
  setQuery: (value: string) => void;
}

export default function SearchBox({ setQuery }: SearchBoxProp) {
  const updateQuery = useDebouncedCallback((value: string) => {
    setQuery(value);
  }, 300);

  return (
    <input
      type="text"
      onChange={(e) => updateQuery(e.target.value)}
      placeholder="Search notes..."
    />
  );
}
