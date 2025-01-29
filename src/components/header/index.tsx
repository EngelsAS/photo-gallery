import { UserCircleIcon } from "@heroicons/react/24/outline";
import Logo from "./logo";
import SearchInput from "./search-input";
import Container from "./container";

const Header = () => {
  return (
    <Container>
      <Logo />
      <SearchInput />
      <UserCircleIcon className="size-8 text-black" />
    </Container>
  );
};

export default Header;
