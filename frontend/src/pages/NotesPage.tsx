import { Container } from "react-bootstrap";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import styles from '../styles/Notespage.module.css';
import { User } from "../models/user";

interface NotesPageProps {
    loggedInUser: User | null;
}

const NotesPage = ({loggedInUser}: NotesPageProps) => {
    return ( 
        <Container className={styles.notesPage}>
            <>
                {loggedInUser
                ? <NotesPageLoggedInView />
                : <NotesPageLoggedOutView />}  
                {/* if logged in user exists, show logged in view, else show logged out view */}
            </>
      </Container>
     );
}
 
export default NotesPage;