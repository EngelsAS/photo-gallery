import Logo from "./components/logo";
import SearchInput from "./components/search-input";
import Container from "./components/container";

const Header = () => {
  return (
    <Container>
      <Logo />
      <SearchInput />
    </Container>
  );
};

export default Header;
