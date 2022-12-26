import { ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./ChatList.module.css"
import { DeleteButton } from "./DeleteButton";

export const ChatItem = ({ chat }) => (
  <ListItem key={chat.id} className={styles.chatItem}>
    <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
    <DeleteButton id={chat.id}/>
  </ListItem>
);