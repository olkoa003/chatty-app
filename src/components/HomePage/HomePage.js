import { useState } from "react";
import { Link } from "react-router-dom";
import { login, signUp } from "../../services/firebase";
import { signInWithGoogle } from "../../services/firebase";
import styles from "./HomePage.module.css"
import { signInWithGitHub } from "../../services/firebase";

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
            <div class={styles.loginForm}>
                <h1>{isSignUp ? "SignUp to Chatty" : "Login to chatty"}</h1>
                <form onSubmit={handleSubmit}>
                    <div class={styles.content}>
                        <div class={styles.inputField}>
                            <input type="email" placeholder="Email" value={email} onChange={handleChangeEmail} autocomplete="nope" required />
                        </div>
                        <div class={styles.inputField}>
                            <input type="password" value={pass} onChange={handleChangePass} placeholder="Password" autocomplete="new-password" />
                        </div>
                        <div>
                            Already have an account?
                            <Link to={`${isSignUp ? "/" : "/signup"}`}>
                                {!isSignUp ? "SignUp" : "Login"}
                            </Link>
                        </div>
                        <Link href="#" class="link">Forgot Your Password?</Link>
                        <div class={styles.action}>
                            <button>Register</button>
                            <button>Sign in</button>
                            <button onClick={signInWithGoogle}>Sign in with Google</button>
                            <button onClick={signInWithGitHub}>Sign in with GitHub</button>
                        </div>
                        {error && <span>{error}</span>}
                    </div>
                </form>
            </div>
        </>
    );
};