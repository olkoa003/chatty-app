import { MessageList } from './components/MessageList/MessageList';
import styles from "./App.module.css"
import React, { useState } from 'react';
import { Form } from './components/Form/Form';
import { useEffect } from 'react';
import { AUTHORS } from './components/utils/constants';
// import { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment } from 'react';
import { ChatList } from './components/ChatList/ChatList';
import { Card } from '@mui/material';


export function App() {
  const [messageList, setMessageList] = useState([]);

  // const messagesEnd = useRef();

  const handleAddMessage = (text) => {
    sendMessage(text, AUTHORS.ME);
  };

  const sendMessage = (text, author) => {
    const newMsg = {
      text,
      author,
      id: `msg-${Date.now()}`
    };
    setMessageList((prevMessageList) => [...prevMessageList, newMsg]);
  };

  useEffect(() => {
    let timeout;
    // messagesEnd.current?.scrollIntoView();

    if (messageList[messageList.length - 1]?.author === AUTHORS.ME) {
      timeout = setTimeout(() => {
        sendMessage("Hello, I am your personal BOT! How can I help?", AUTHORS.BOT);
      }, 1000);
    };


    return () => {
      clearTimeout(timeout);
    }

  }, [messageList]);

  return (
    <Fragment>
      <Card variant="outlined" sx={{ width: 320, display: 'flex', flexDirection: 'column'}}>
      <div className={styles.chatBoxHeader}>
          <h3>Active Chats</h3>
        </div>
          <ChatList />
      </Card>
      <div className={styles.chatBox}>
        <div className={styles.chatBoxHeader}>
          Chatbox
          <span className={styles.chatBoxToggle}><CloseIcon /></span>
          <div className={styles.chatBoxBody}>
            <div className={styles.chatLogs}>
              <MessageList messages={messageList} />
              {/* <div ref={messagesEnd} /> */}
            </div>
            <Form onSubmit={handleAddMessage} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
