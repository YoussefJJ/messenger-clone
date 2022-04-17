import './App.css';
import AuthScreen from './pages/AuthScreen';
import HomeScreen from './pages/HomeScreen';
import { useState } from 'react'
import AuthContext from './context/AuthContext'

function App() {

  const [authenticated, setAuthenticated] = useState(localStorage.getItem('jwt') ? true : false);

  return (
    // <>
    // {
    //   loggedIn ? <HomeScreen setLoggedIn={setLoggedIn}/> : <AuthScreen setLoggedIn={setLoggedIn}/>
    // }
    // </>
    <AuthContext.Provider value={{authenticated, setAuthenticated}}>
      {
      authenticated ? <HomeScreen/> : <AuthScreen/>
      }
    </AuthContext.Provider>
  );
}

export default App;
