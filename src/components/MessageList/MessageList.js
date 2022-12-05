import { Message } from "../Message/Message";
import { AUTHORS } from "../utils/constants";
import "./MessageList.css"

export const MessageList = ({ messages }) => {
    const {BOT} = AUTHORS;
    return messages.map((message) => (
        <div key={message.id} className={`cmMsgText ${message.author === BOT ? 'invalid' : '' }`}>
            <Message text={message.text} author={message.author} />
        </div>
    ));
};