import { useState } from "react";
import { Link } from "react-router-dom";
import { login, signUp } from "../../services/firebase";
import { signInWithGoogle } from "../../services/firebase";
import styles from "./HomePage.module.css"
import { signInWithGitHub } from "../../services/firebase";
import Google from "@mui/icons-material/Google";
import GitHubIcon from '@mui/icons-material/GitHub';
import Alert from '@mui/material/Alert';

export const HomePage = ({ isSignUp }) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePass = (e) => {
        setPass(e.target.value);
    };

    const handleSignUp = async () => {
        try {
            await signUp(email, pass);
        } catch (e) {
            setError(e.message);
        }
    };

    const handleSignIn = async () => {
        try {
            await login(email, pass);
        } catch (e) {
            setError(e.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            handleSignUp();
        } else {
            handleSignIn();
        }

        setEmail("");
        setPass("");
    };

    return (
        <>
            <div className={styles.loginForm}>
                <h1 className={styles.signUpLogin}>{isSignUp ? "SignUp to Chatty" : "Login to Chatty"}</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.content}>
                        <div className={styles.inputField}>
                            <input type="email" placeholder="Email" value={email} onChange={handleChangeEmail} required />
                        </div>
                        <div className={styles.inputField}>
                            <input type="password" value={pass} onChange={handleChangePass} placeholder="Password" />
                        </div>
                        <div className={styles.action}>
                            <button>Register</button>
                            <button>Sign in</button>
                        </div>
                        {!error ? <span></span> :
                        <Alert severity="error">
                            {error && <span>{error}</span>}
                        </Alert>
                        }
                        <div>
                            <h2 className={styles.headerText}>Or Login with Social Media:</h2>
                            <button className={styles.githubBtn} onClick={signInWithGitHub}>
                                <GitHubIcon /> Login with GitHub
                            </button>
                            <button className={styles.googleBtn} onClick={signInWithGoogle} >
                                <Google /> Login with Google
                            </button>
                        </div>
                        <div className={styles.alreadyAccount}>
                            <p>Already have an account?</p>
                            <Link to={`${isSignUp ? "/" : "/signup"}`}>
                                {!isSignUp ? "SignUp" : "Login"}
                            </Link>
                        </div>
                        <Link href="#" className={styles.link}>Forgot Your Password?</Link>
                    </div>
                </form>
            </div>
        </>
    );
};