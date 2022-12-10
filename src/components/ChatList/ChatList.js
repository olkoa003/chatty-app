import { List } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Card } from '@mui/material';
import styles from "./ChatList.module.css";
import { Form } from "../Form/Form";
import { ChatItem } from "./ChatItem";
import { addChat } from "../../store/chats/actions";
import { selectChats } from "../../store/chats/selectors";
import { useDispatch, useSelector } from "react-redux";

export const ChatList = () => {
    const chats = useSelector(selectChats);
    const dispatch = useDispatch();

    const handleAddChat = (newChatName) => {
        const newId = `chat-${Date.now()}`;
        dispatch(addChat(newId, newChatName));
    };
    return (
        <>
            <Card variant="outlined" sx={{ width: 320, display: 'flex', flexDirection: 'column' }}>
                <div className={styles.chatBoxHeader}>
                    <h3>Active Chats</h3>
                </div>
                <List>
                    {chats.map((chat) => (
                        <ChatItem key={chat.id} chat={chat} />
                    ))}
                </List>
                <Form onSubmit={handleAddChat} />
            </Card>
            <Outlet />
        </>
    );
};
