// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles/Notespage.module.css';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import { useState } from 'react';
import { useEffect } from 'react';
import * as NotesApi from './network/notes_api';
import LogInModal from './components/LogInModal';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotesPage from './pages/NotesPage';
import NotFoundPage from './pages/NotFoundPage';



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
    <BrowserRouter>
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => setShowSignUpModal(true)} // if sign up clicked, show sign up modal
        onLogInClicked={() => setShowLogInModal(true)} // if log in clicked, show log in modal
        onLogOutSuccessful={() => setLoggedInUser(null)} // if log out clicked, set logged in user to null
      />
      
      <Container className={styles.pageContainer}>
        <Routes>
          <Route 
            path='/'
            element={<NotesPage loggedInUser={loggedInUser} />}
          />
          <Route 
            path='/*'
            element={<NotFoundPage />}
          />
        </Routes>
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
    </BrowserRouter>
  );
}

export default App;
