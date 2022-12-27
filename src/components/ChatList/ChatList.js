import { List } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Card } from '@mui/material';
import styles from "./ChatList.module.css";
import { Form } from "../Form/Form";
import { ChatItem } from "./ChatItem";
import { addChat } from "../../store/chats/actions";
// import { selectChats } from "../../store/chats/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onChildAdded, onChildRemoved, onValue, set } from "@firebase/database";
import {
    chatsRef,
    getChatsRefById,
    getMessageRefById,
    getMessagesRefByChatId,
} from "../../services/firebase";

export const ChatList = () => {
    const [chats, setChats] = useState([]);
    // const chats = useSelector(selectChats);
    // const dispatch = useDispatch();

    const handleAddChat = (newChatName) => {
        const newId = `chat-${Date.now()}`;
        // dispatch(addChat(newId, newChatName));
        set(getChatsRefById(newId), { id: newId, name: newChatName });
        set(getMessagesRefByChatId(newId), { empty: true });
    };

    // useEffect(() => {
    //     const unsubscribe = onValue(chatsRef, (snapshot) => {
    //         const newChats = [];
    //         snapshot.forEach((child) => {
    //             newChats.push(child.val());
    //         });

    //         setChats(newChats);
    //     });

    //     return unsubscribe;
    // }, []);

    useEffect(() => {
        const unsubscribe = onChildAdded(chatsRef, (snapshot) => {
            setChats((prevChats) => [...prevChats, snapshot.val()]);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const unsubscribe = onChildRemoved(chatsRef, (snapshot) => {
            setChats((prevChats) =>
                prevChats.filter(({ id }) => id !== snapshot.val()?.id)
            );
        });

        return unsubscribe;
    }, []);

    return (
        <>
            <Card variant="outlined" sx={{ width: 320, display: 'flex', flexDirection: 'column', margin: "20px" }}>
                <div className={styles.chatBoxHeader}>
                    <h3>Active Chats</h3>
                </div>

                <List>
                    {chats.length === 0 ? <p className={styles.noactive}>Sorry, no active chats</p> :
                        (chats.map((chat) => (
                            <ChatItem key={chat.id} chat={chat} />
                        )))}
                </List>
                <Form onSubmit={handleAddChat} />
            </Card>
            <Outlet />
        </>
    );
};



