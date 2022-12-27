import { MessageList } from "../MessageList/MessageList";
import React, { useEffect, useRef } from 'react';
import { Form } from "../Form/Form";
import { AUTHORS } from "../../utils/constants"
import { Fragment } from 'react';
import styles from "./Chat.module.css";
import { Navigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectMessages } from "../../store/messages/selectors";
import { addMessageWithThunk } from "../../store/messages/actions";
import "../../App.module.css";
import {
  onChildAdded,
  onChildRemoved,
  onValue,
  push,
  set,
} from "@firebase/database";
import { getMessageRefById, getMessagesRefByChatId, getMessageListRefByChatId } from "../../services/firebase";
import { useState } from "react";

export const Chat = () => {
  const params = useParams();
  const { chatId } = params;
  // const messages = useSelector(selectMessages);
  const dispatch = useDispatch();
  const messagesEnd = useRef();
  const [messages, setMessages] = useState([]);

  const handleAddMessage = (text) => {
    sendMessage(text, AUTHORS.ME);
  };

  const sendMessage = (text, author) => {
    const newMsg = {
      text,
      author,
      id: `msg-${Date.now()}`,
    };
    set(getMessageRefById(chatId, newMsg.id), newMsg);
    // dispatch(addMessageWithThunk(chatId, newMsg));
  };

  useEffect(() => {
    const unsubscribe = onValue(getMessagesRefByChatId(chatId), (snapshot) => {
      if (!snapshot.val()?.empty) {
        setMessages(null);
      }
    });

    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    const unsubscribe = onChildAdded(
      getMessageListRefByChatId(chatId),
      (snapshot) => {
        console.log(snapshot.val());
        setMessages((prevMessages) => [...prevMessages, snapshot.val()]);
      }
    );

    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    const unsubscribe = onChildRemoved(
      getMessageListRefByChatId(chatId),
      (snapshot) => {
        console.log(snapshot.val());
        setMessages((prevMessages) =>
          prevMessages.filter(({ id }) => id !== snapshot.val()?.id)
        );
      }
    );

    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView();
  }, [messages]);

  if (!messages) {
    return <Navigate to="/chats" replace />;
  }

  return (
    <Fragment>
      <div className={styles.chatBox}>
        <div className={styles.chatBoxHeader}>
          Chatbox
          <div className={styles.chatBoxBody}>
            <div className={styles.chatLogs}>
              <MessageList messages={messages} />
              <div ref={messagesEnd} />
            </div>
            <Form onSubmit={handleAddMessage} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}