import { useParams } from "react-router";
import SearchView from "./view";

const Search = () => {
  const { query } = useParams();

  return <SearchView key={query} query={query!} />;
};

export default Search;
