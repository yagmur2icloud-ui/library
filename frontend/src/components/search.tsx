import { useState } from "react";

interface BookSearchProps {
  onSearch: (value: string) => void;
}

const BookSearch = ({ onSearch }: BookSearchProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    onSearch(val);
  };

  return (
    <div className="hidden md:block flex-1 max-w-xs mx-4">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Kitap ara..."
        className="w-full bg-third px-3 py-2 rounded-xl outline-none focus:bg-fourth text-black transition"
      />
    </div>
  );
};

export default BookSearch;