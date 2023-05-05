// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import { useState } from 'react';
import { useEffect } from 'react';
import * as NotesApi from './network/notes_api';
import styles from './styles/Notespage.module.css';
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';
import LogInModal from './components/LogInModal';


function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null); // set initial state of loggedInuser to null

  const [showSignUpModal, setShowSignUpModal] = useState<Boolean>(false); // do not show sign up modal by default 
  const [showLogInModal, setShowLogInModal] = useState<Boolean>(false); // do not show log in modal by default

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);        
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser(); // call function
  }, []); // only get the logged in user function one time 



  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => setShowSignUpModal(true)} // if sign up clicked, show sign up modal
        onLogInClicked={() => setShowLogInModal(true)} // if log in clicked, show log in modal
        onLogOutSuccessful={() => setLoggedInUser(null)} // if log out clicked, set logged in user to null
      />
      <Container className={styles.notesPage}>
        <>
        {loggedInUser
        ? <NotesPageLoggedInView />
        : <NotesPageLoggedOutView />}  
        {/* if logged in user exists, show logged in view, else show logged out view */}
        </>
      </Container>
      {showSignUpModal &&
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false)
            }}
            // if sign up successful, set logged in user to user and hide modal
          />
        }
        {showLogInModal &&
          <LogInModal
            onDismiss={() => setShowLogInModal(false)}
            onLogInSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLogInModal(false);
            }}
            // if logged in user exists, show logged in view, else show logged out view
          />
        }
    </div>
  );
}

export default App;
