import { List, ListItem } from "@mui/material";
import styles from "./ChatList.module.css";

const chats = [
    {
        name: "Chat_1",
        id: "chat1"
    },
    {
        name: "Chat_2",
        id: "chat1"
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
        <List>
            {chats.map((chat) => <ListItem key={chat.id} className={styles.chats}>{chat.name}</ListItem>)}
        </List>
    );
};
