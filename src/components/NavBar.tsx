import { useState } from "react";
import { Navbar, Container, Nav, Form, InputGroup, DropdownButton, Dropdown, FormControl, Button } from "react-bootstrap";
import { BiSearch } from 'react-icons/bi';
import { Link, useNavigate } from "react-router-dom";

const SearchBar = (props:{selected?: string, pageSelected?: string}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState(props.selected || "character");
  const navigate = useNavigate();

  let linkHome, linkPlanet, linkStarship, linkFavourite = "";
  if (props.pageSelected) {
    switch (props.pageSelected) {
      case "planet":
        linkPlanet = "nav-link-selected";
        break;
      case "starship":
        linkStarship = "nav-link-selected";
        break;
      case "favourite":
        linkFavourite = "nav-link-selected";
        break;
      default:
        linkHome = "nav-link-selected";      
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search/${searchText}/${selectedOption}`);
  }

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/" className={`nav-link ${linkHome}`}>Characters</Link>
            <Link to="/planet/" className={`nav-link ${linkPlanet}`}>Planets</Link>
            <Link to="/starship/" className={`nav-link ${linkStarship}`}>Starships</Link>
            <Link to="/favourite/" className={`nav-link ${linkFavourite}`}>Favourites</Link>
          </Nav>
          <Form onSubmit={handleFormSubmit} className="search-bar">
            <InputGroup>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchText} onChange={(event) => setSearchText(event.target.value)}/>
              <Button variant="secondary" type="submit" data-testid="search-button">
                <BiSearch />
              </Button>
              <DropdownButton data-testid="search-dropdown" variant="outline-secondary" title={selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}>
                <Dropdown.Item onClick={() => setSelectedOption("character")}>Characters</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedOption("planet")}>Planets</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedOption("starship")}>Starships</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SearchBar;