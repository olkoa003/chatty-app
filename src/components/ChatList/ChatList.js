import { List, ListItem } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { Card } from '@mui/material';
import styles from "./ChatList.module.css";

const chats = [
    {
        name: "Chat_1",
        id: "chat1"
    },
    {
        name: "Chat_2",
        id: "chat2"
    },
    {
        name: "Chat_3",
        id: "chat3"
    },
    {
        name: "Chat_4",
        id: "chat4"
    },
];

export const ChatList = () => {
    return (
        <>
            <Card variant="outlined" sx={{ width: 320, display: 'flex', flexDirection: 'column' }}>
                <div className={styles.chatBoxHeader}>
                    <h3>Active Chats</h3>
                </div>
                <List>
                    {chats.map((chat) => (
                        <ListItem key={chat.id}>
                            <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
                        </ListItem>
                    ))}
                </List>
            </Card>
            <Outlet />
        </>
    );
};
