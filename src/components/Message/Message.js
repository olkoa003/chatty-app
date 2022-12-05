import React from "react";
import styles from './Message.module.css';
import PropTypes from "prop-types";

export const Message = ({ text, author }) => {
    return (
        <div>
            <div className={styles.chatMsg}>
                {author}:{text}
            </div>
        </div>
    );
}

Message.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number]),
    author: PropTypes.string.isRequired,
};