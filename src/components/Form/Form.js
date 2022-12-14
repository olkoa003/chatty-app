import React, { useState, useEffect, useRef } from "react";
import styles from "./Form.module.css"
import SendIcon from '@mui/icons-material/Send';


export const Form = ({ onSubmit }) => {
    const [value, setValue] = useState('');
    const textField = useRef();

    const handleChange = (event) => {
        setValue(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(value);
        setValue("");
    };

    useEffect(() => {
        textField.current?.focus();
    }, []);

    return (
        <div className={styles.chatInput}>
            <form onSubmit={handleSubmit}>
                <input type="text" className={styles.chatInput2} placeholder="Send a message..." value={value} ref={textField} onChange={handleChange} required />
                <button type="submit" className={styles.chatSubmit}><SendIcon sx={{ color: '#5A5EB9' }}/></button>
            </form>
        </div>
    );
};