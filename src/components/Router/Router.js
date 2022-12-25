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

export const Router = () => {
    const [authed, setAuthed] = useState(false);

    const unauthorize = () => {
        setAuthed(false);
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
            <div class={styles.topnav}>
                <NavLink
                    to="/"
                    style={({ isActive }) => ({ color: isActive ? "green" : "grey" })}
                >
                    home
                </NavLink>
                <NavLink
                    style={({ isActive }) => ({ color: isActive ? "green" : "grey" })}
                    to="/chats"
                >
                    chats
                </NavLink>
                <NavLink
                    style={({ isActive }) => ({ color: isActive ? "green" : "grey" })}
                    to="/profile"
                >
                    profile
                </NavLink>
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
                <Route path="chats" element={<ChatList />}>
                    <Route path=":chatId" element={<Chat />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};