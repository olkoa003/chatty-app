import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { NotFound } from "../NotFound/NotFound";
import { ChatList } from "../ChatList/ChatList";
import { HomePage } from "../HomePage/HomePage";
import { Chat } from "../Chat/Chat";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import ConnectedProfile from "../Profile/Profile";
import { PublicRoute } from "../PublicRoute/PublicRoute"
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import styles from './Router.module.css';
import { logout } from "../../services/firebase";

export const Router = () => {
    const [authed, setAuthed] = useState(false);

    const unauthorize = () => {
        setAuthed(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (e) {
            console.warn(e);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthed(true);
            } else {
                setAuthed(false);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <BrowserRouter>
            <div className={styles.topnav}>
                {authed && <div><NavLink to="/chats">
                    Chats
                </NavLink>
                    {/* <NavLink to="/">
                        Home
                    </NavLink> */}
                    <NavLink to="/profile">
                        Profile
                    </NavLink></div>
                }
                {authed && <div className={styles.logoutBlock}>
                    <NavLink onClick={handleLogout}>
                        Logout
                    </NavLink>
                </div>}
            </div>
            <Routes>
                <Route path="/" element={<PublicRoute authed={authed} />}>
                    <Route path="" element={<HomePage />} />
                    <Route path="/signup" element={<HomePage isSignUp />} />
                </Route>
                <Route path="/profile" element={<PrivateRoute authed={authed} />}>
                    <Route
                        path=""
                        element={<ConnectedProfile onLogout={unauthorize} />}
                    />
                </Route>
                <Route element={<PrivateRoute authed={authed} />}>
                    <Route path="chats" element={<ChatList />}>
                        <Route path=":chatId" element={<Chat />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes >
        </BrowserRouter>
    );
};