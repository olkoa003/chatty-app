import { MessageList } from "../MessageList/MessageList";
import React, { useState, useEffect } from 'react';
import { Form } from "../Form/Form";
import { AUTHORS } from "../utils/constants";
// import { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment } from 'react';
import styles from "./Chat.module.css";
import { useParams, Navigate } from "react-router";
import "../../App.module.css";

export const Chat = () => {
  const params = useParams();
  const { chatId } = params;

  const [messageList, setMessageList] = useState({
    chat1: [],
    chat2: [],
    chat3: [],
    chat4: [],
  });

  // const messagesEnd = useRef();

  const handleAddMessage = (text) => {
    sendMessage(text, AUTHORS.ME);
  };

  const sendMessage = (text, author) => {
    const newMsg = {
      text,
      author,
      id: `msg-${Date.now()}`,
    };
    setMessageList((prevMessageList) => ({
      ...prevMessageList,
      [chatId]: [...prevMessageList[chatId], newMsg],
    }));
  };

  useEffect(() => {
    // messagesEnd.current?.scrollIntoView();

    let timeout;
    if (
      messageList[chatId]?.[messageList[chatId]?.length - 1]?.author ===
      AUTHORS.ME
    ) {
      timeout = setTimeout(() => {
        sendMessage("Hello! I am your personal BOT! How can I help? ", AUTHORS.BOT);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [messageList, chatId]);

  // useEffect(() => {
  //   console.log(messagesEnd);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (!messageList[chatId]) {
    return <Navigate to="/chats" replace />;
  }


  return (
    <Fragment>
      <div className={styles.chatBox}>
        <div className={styles.chatBoxHeader}>
          Chatbox
          <span className={styles.chatBoxToggle}><CloseIcon /></span>
          <div className={styles.chatBoxBody}>
            <div className={styles.chatLogs}>
              <MessageList messages={messageList[chatId]} />
              {/* <div ref={messagesEnd} /> */}
            </div>
            <Form onSubmit={handleAddMessage} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}