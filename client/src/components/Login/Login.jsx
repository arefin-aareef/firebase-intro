import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, GithubAuthProvider } from "firebase/auth";
import app from '../../firebase/firebase.init';

const Login = () => {

    const [user, setUser] = useState(null)

    const auth = getAuth(app);
    // console.log(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser)
        })
        .catch(error => {
            console.log(error, 'Got Error');
        })
    }

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser)
        })
        .catch(error => {
            console.log(error, 'Got Error');
        })
    }

    const handleGoogleSignOut = () => {
        signOut(auth)
        .then(result => {
            console.log(result);
            setUser(null)
        })
        .catch(error => {
            console.log(error, 'got error');
        })
    }

    return (
        <div>
            {
                user ?
                <button onClick={handleGoogleSignOut}>Logout</button> : 
                <>
                    <button onClick={handleGoogleSignIn}>Google Login</button>
                    <button onClick={handleGithubSignIn}>GitHub Login</button>
                </>

            }
            {
                user && <div>
                <h3>User: {user.displayName}</h3>
                <p>Email: {user.email}</p>
            </div>
            }
        </div>
    );
};

export default Login;