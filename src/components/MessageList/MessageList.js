import { Message } from "../Message/Message";
import { AUTHORS } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { deleteMessage, editMessage } from "../../store/messages/actions";
import "./MessageList.css"

export const MessageList = ({ messages }) => {
    const { chatId } = useParams();
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteMessage(chatId, id));
    };

    const handleEdit = (id) => {
        dispatch(editMessage(chatId, id, "edited"));
    };
    const { BOT } = AUTHORS;
    return messages.map((message) => (
        <div key={message.id} className={`cmMsgText ${message.author === BOT ? 'invalid' : ''}`}>
            <Message text={message.text} author={message.author} />
            <button onClick={() => handleDelete(message.id)}>Delete</button>
            <button onClick={() => handleEdit(message.id)}>Edit</button>
        </div>
    ));
};