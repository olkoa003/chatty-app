import React from "react";
import styles from './Message.module.css';

export const Message = ({ text, author }) => {
    return (
        <div>
            <div className={styles.chatMsg}>
                {author}:{text}
            </div>
        </div>
    );
}