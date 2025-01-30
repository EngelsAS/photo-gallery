import { UserCircleIcon } from "@heroicons/react/24/outline";
import Logo from "./components/logo";
import SearchInput from "./components/search-input";
import Container from "./components/container";

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
