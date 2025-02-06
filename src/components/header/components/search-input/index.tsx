import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router";

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      navigate(`/search/${inputValue}`);
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative flex items-center grow">
      <MagnifyingGlassIcon className="size-5 text-zinc-500 absolute left-3" />
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        value={inputValue}
        onChange={handleChangeInput}
        className={`${
          isFocused ? "bg-white" : "bg-zinc-200"
        } transition-colors rounded-3xl p-2 grow px-10 outline-0 border border-zinc-200 `}
        placeholder="Pesquise fotos e ilustrações"
      />
    </div>
  );
};

export default SearchInput;
