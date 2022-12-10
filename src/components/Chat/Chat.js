import { MessageList } from "../MessageList/MessageList";
import React, { useEffect, useRef } from 'react';
import { Form } from "../Form/Form";
import { AUTHORS } from "../../utils/constants";
import CloseIcon from '@mui/icons-material/Close';
import { Fragment } from 'react';
import styles from "./Chat.module.css";
import { Navigate, useParams } from "react-router";
import "../../App.module.css";

export const Chat = ({messages , addMessage}) => {
  const params = useParams();
  // const navigate = useNavigate();
  const { chatId } = params;

  const messagesEnd = useRef();

  const handleAddMessage = (text) => {
    sendMessage(text, AUTHORS.ME);
  };

  const sendMessage = (text, author) => {
    const newMsg = {
      text,
      author,
      id: `msg-${Date.now()}`,
    };
    addMessage(chatId, newMsg);
  };

  useEffect(() => {
    messagesEnd.current?.scrollIntoView();
  }, [messages]);

  if (!messages[chatId]) {
    return <Navigate to="/chats" replace />;
  }

  // useEffect(() => {
  //   console.log(messagesEnd);
  // }, []);

  return (
    <Fragment>
      <div className={styles.chatBox}>
        <div className={styles.chatBoxHeader}>
          Chatbox
          <span className={styles.chatBoxToggle}><CloseIcon /></span>
          <div className={styles.chatBoxBody}>
            <div className={styles.chatLogs}>
              <MessageList messages={messages[chatId]} />
              <div ref={messagesEnd} />
            </div>
            <Form onSubmit={handleAddMessage} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}