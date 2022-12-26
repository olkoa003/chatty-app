import { MessageList } from "../MessageList/MessageList";
import React, { useEffect, useRef } from 'react';
import { Form } from "../Form/Form";
import { AUTHORS } from "../../utils/constants";
import { Fragment } from 'react';
import styles from "./Chat.module.css";
import { Navigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectMessages } from "../../store/messages/selectors";
import { addMessageWithThunk } from "../../store/messages/actions";
import "../../App.module.css";

export const Chat = () => {
  const params = useParams();
  const { chatId } = params;
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();
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
    dispatch(addMessageWithThunk(chatId, newMsg));
  };

  useEffect(() => {
    messagesEnd.current?.scrollIntoView();
  }, [messages]);

  if (!messages[chatId]) {
    return <Navigate to="/chats" replace />;
  }

  return (
    <Fragment>
      <div className={styles.chatBox}>
        <div className={styles.chatBoxHeader}>
          Chatbox
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