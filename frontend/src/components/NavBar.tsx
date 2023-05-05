// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void, 
    onLogInClicked: () => void,
    onLogOutSuccessful: () => void,
}

const NavBar = ({loggedInUser, onSignUpClicked, onLogInClicked, onLogOutSuccessful}: NavBarProps) => {
    // This will be a reusable component for the Nav Bar in the app.
    return ( 
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand>
                    DIAIRY
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        { loggedInUser
                        ? <NavBarLoggedInView user={loggedInUser} onLogOutSuccessful={onLogOutSuccessful}/> // if user exists
                        : <NavBarLoggedOutView onSignUpClicked={onSignUpClicked} onLogInClicked={onLogInClicked}/> // if signed out
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
     );
}
 
export default NavBar;