import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { NotFound } from "../NotFound/NotFound";
import { ChatList } from "../ChatList/ChatList";
import { HomePage } from "../HomePage/HomePage";
import { Chat } from "../Chat/Chat";

export const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <NavLink
                    to="/"
                    style={({ isActive }) => ({ color: isActive ? "green" : "grey" })}
                >
                    home
                </NavLink>
            </div>
            <div>
                <NavLink
                    style={({ isActive }) => ({ color: isActive ? "green" : "grey" })}
                    to="/chats"
                >
                    chats
                </NavLink>
            </div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="chats" element={<ChatList />}>
                    <Route path=":chatId" element={<Chat />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};