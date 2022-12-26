import { Message } from "../Message/Message";
import { AUTHORS } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { deleteMessage, editMessage } from "../../store/messages/actions";
import "./MessageList.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const MessageList = ({ messages }) => {
    const { chatId } = useParams();
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteMessage(chatId, id));
    };

    const handleEdit = (id) => {
        dispatch(editMessage(chatId, id, "edited"));
    };
    const { BOT, ME } = AUTHORS;
    return messages.map((message) => (
        <div key={message.id} className={`cmMsgText ${message.author === BOT ? 'invalid' : ''}`}>
            <Message text={message.text} author={message.author} />
            {message.author === ME &&
            <DeleteIcon onClick={() => handleDelete(message.id)} />
            }
            {message.author === ME &&
            <EditIcon onClick={() => handleEdit(message.id)} />
            }
        </div>
    ));
};