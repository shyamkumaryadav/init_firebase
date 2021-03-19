import { useState, useEffect } from 'react'
import firebase from './firebase'

function App() {
  const auth = firebase.auth()
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [elmessage, setElMessage] = useState(null)

  const login = event => {
    event.preventDefault()
    auth.createUserWithEmailAndPassword(email, password)
    .then( userCredential => {
      auth.signInWithCredential(userCredential)
      .then((result) => {
        
        setUser(result.user)
        setMessage(result.user.email)
      })
      .catch((error) => {
        setMessage(error.message + " of email: "+ error.email)
      });
    })
    .catch((error) => {
      setMessage(error.message)
      setPassword('')
      setEmail('')
    });
  }

  const updateInput = event => {
    event.target.name === "email" ? setEmail(event.target.value) : setPassword(event.target.value)
    
  }

  const sendEmail = event => {
    event.preventDefault()
    auth.sendPasswordResetEmail(email).then(function() {
      setElMessage("Check your email")
    }).catch(function(error) {
      setElMessage(error.message)
    })
    setEmail('')
  }

  useEffect(()=> {
    // const user  = auth.currentUser
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        setMessage("User Login with email: "+ user?.email)
      }else {
        setMessage("User not Login")
        setUser(null)
      }
    });
  }, [auth])

  const userLogout = () => {
    auth.signOut()
    .then(function() {
      setMessage("User LogOut complet!!!")
    })
    .catch(function(error) {
      setMessage(error.message)
    });
  }
  const loginUser = event => {
    event.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
    .then( result => {
        setUser(result.user)
        setMessage(result.user.email)
    })
    .catch((error) => {
      setMessage(error.message)
      setPassword('')
    });
  }

  const sendvEmail = () => {
    user.sendEmailVerification().then(function() {
      setMessage("Verification Email send...")
    }).catch(function(error) {
      setMessage(error.message)
    });
  }
  const userDel = () => {
    firebase.auth().currentUser.delete().then(function() {
      setMessage("User deleted.")
    }).catch(function(error) {
      setMessage(error.message)
    });
  }

  return (
    <div className="App">
      <header className="App-header" style={{ color: '#4a3131'}}>
        <h1>Project 1</h1>
      </header>
      <main>
        <h1 style={{ textAlign: "center"}}>create User With Email And Password</h1>
        { user && <button onClick={userLogout}>Logout {user?.email} ? { user?.emailVerified ? "Yes" : "No" }</button>}
        <br />
        <br />
        { user && <button onClick={userDel}>Delete</button>}
        <br />
        <br />
        <form method="POST">
          <div>
            <label>email</label>
            <input type="email" name="email" onInput={updateInput} value={email} placeholder="Enter your Email" ></input>
            
          </div>
          <div>
            <label>Password</label>
            <input type="Password" name="password" onInput={updateInput} value={password} placeholder="Enter your Password" ></input>
          </div>
          <button onClick={login}>Create User and login</button>
        </form>
        <br/>
        <br/>
        <br/>
        { !user && <form method="POST">
          <div>
            <label>email</label>
            <input type="email" name="email" onInput={updateInput} value={email} placeholder="Enter your Email" ></input>
            
          </div>
          <div>
            <label>Password</label>
            <input type="Password" name="password" onInput={updateInput} value={password} placeholder="Enter your Password" ></input>
          </div>
          <button onClick={loginUser}>User Login</button>
        </form>}
        <br/>
        <br/>
        <br/>

        {
          message && <p>{ message }</p>
        }
        <br/>
        <br/>
        <br/>

        {
          elmessage ? <p>{elmessage} <button onClick={() => setElMessage("")}>X</button></p> : <div>
            <label>forget password </label>
            <input type="email" name="email" onInput={updateInput} value={email} placeholder="Enter your Email" ></input>
            <button onClick={sendEmail}>Send mail</button>
          </div>
        }
        <br />
        <br />
        <br />
        <br />
        {
          user && 
          !user.emailVerified && 
          <div>
            <label>Email Verification </label>
            <button onClick={sendvEmail}>Send mail</button>
          </div>
        }

      </main>
    </div>
  );
}

export default App;
