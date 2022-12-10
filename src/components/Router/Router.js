import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { NotFound } from "../NotFound/NotFound";
import { ChatList } from "../ChatList/ChatList";
import { HomePage } from "../HomePage/HomePage";
import { Chat } from "../Chat/Chat";
import { Profile } from "../Profile/Profile";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChat, deleteChat } from "../../store/chats/actions";
// import { selectChats } from "../../store/chats/selectors";
// import { addMessage } from "../../store/messages/actions";
// import { selectMessages } from "../../store/messages/selectors";
const inititalChats = [
    {
        name: "Chat 1",
        id: "chat1",
    },
    {
        name: "Chat 2",
        id: "chat2",
    },
    {
        name: "Chat 3",
        id: "chat3",
    },
];


const initialMessages = inititalChats.reduce((acc, el) => {
    acc[el.id] = [];
    return acc;
}, {});

export const Router = () => {
    const [messages, setMessages] = useState(initialMessages);

    const chatList = useSelector((state) => {
        return state.chats
    });
    const dispatch = useDispatch();

    const handleAddMessage = (chatId, newMsg) => {
        setMessages((prevMessageList) => ({
            ...prevMessageList,
            [chatId]: [...prevMessageList[chatId], newMsg],
        }));
    };

    const handleAddChat = (newChatName) => {
        const newId = `chat-${Date.now()}`;
        dispatch(addChat(newId, newChatName));
        setMessages((prevMessages) => ({
            ...prevMessages,
            [newId]: [],
        }));
    };

    const handleDeleteChat = (idToDelete) => {
        dispatch(deleteChat(idToDelete));
        setMessages((prevMessages) => {
            const newMsgs = { ...prevMessages };

            delete newMsgs[idToDelete];
            return newMsgs;
        });
    };

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
            <div>
                <NavLink
                    style={({ isActive }) => ({ color: isActive ? "green" : "grey" })}
                    to="/profile"
                >
                    profile
                </NavLink>
            </div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                    path="chats"
                    element={
                        <ChatList
                            onDeleteChat={handleDeleteChat}
                            onAddChat={handleAddChat}
                            chats={chatList}
                        />
                    }
                >
                    <Route
                        path=":chatId"
                        element={
                            <Chat messages={messages} addMessage={handleAddMessage} />
                        }
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};