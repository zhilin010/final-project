// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
    user: User, 
    onLogOutSuccessful: () => void,
}

const NavBarLoggedInView = ({user, onLogOutSuccessful}: NavBarLoggedInViewProps) => {
    // This is a reusable component for the logged in view of the nav bar.
    
    async function logOut() {
        try {
            await NotesApi.logOut();
            onLogOutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return ( 
        <>
        <Navbar.Text className="me-2">
            Signed in as {user.username}
        </Navbar.Text>
        <Button onClick={logOut}>Log Out</Button>
        </>
     );
}
 
export default NavBarLoggedInView;