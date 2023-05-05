// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
}

const NavBarLoggedOutView = ({onSignUpClicked, onLogInClicked}: NavBarLoggedOutViewProps) => {
    // This is a reusable component for the logged out view of the nav bar.
    return ( 
        <>
            <Button onClick={onSignUpClicked}>Sign Up</Button>
            <Button onClick={onLogInClicked}>Log In</Button>
        </>
     );
}
 
export default NavBarLoggedOutView;