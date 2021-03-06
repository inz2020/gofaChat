import React from 'react'
import {BrowserRouter as Router , Switch, Route} from "react-router-dom"
import Login from './components/Login';
import Chats from './components/Chats';
import {AuthProvider} from './contexts/AuthContext'

function App() {
  return (
    <div  style={{fontFamily:'Avenir'}}>
      <Router>
      <AuthProvider>
        <Switch>
          <Route path="/" component={Login}/>
            <Route path="/chats" component={Chats}/>
        </Switch>
        </AuthProvider>
      </Router>
      
    </div>
  );
}

export default App;
