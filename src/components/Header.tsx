import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import StarWarsLogo from '../assets/star-wars-logo.svg'

import NavBar from './NavBar';

export function Header(props: {title: string, selectedOption?:string, pageSelected?: string}) {
  return (
    <Container>
        <Link to='/'>
            <img
            src={StarWarsLogo}
            className="d-inline-block align-top w-25"
            alt="Star Wars Logo"
            />
        </Link>
        <h2>{props.title}</h2>
        <NavBar selected={props.selectedOption || "character"} pageSelected={props.pageSelected || undefined}/>
    </Container>
  );
}
