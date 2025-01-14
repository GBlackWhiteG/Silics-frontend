"use client";
import Image from "next/image";
import styles from "./PostInput.module.css";
import { Button } from "../../../../components/ui/buttons";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import axios from "axios";

export const AutoResizeTextArea: React.FC<{
    inputName: string;
    inputPlaceholder: string;
    inputState: Dispatch<SetStateAction<string>>
}> = ({ inputName, inputPlaceholder, inputState }) => {
    const [isActive, setIsActive] = useState(false);
    const [content, setContent] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        inputState(event.target.value);
        setContent(event.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <textarea
            name={inputName}
            ref={textareaRef}
            onChange={handleInputChange}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            placeholder={inputPlaceholder}
            value={content}
            cols={25}
            rows={isActive ? 2 : 1}
            className=""
        ></textarea>
    );
};

export function PostInput() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        try {
            const response = axios.post('http://127.0.0.1:8000/api/posts', {
                title,
                description,
                user_id: 1
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.postInput}>
            <div className={styles.wrapperImage}>
                <Image
                    src="/anonymous.jpg"
                    width={40}
                    height={40}
                    alt="user-avatar"
                ></Image>
            </div>
            <div className={styles.inputs}>
                <input type="text" name="title" placeholder="Заголовок записи (необязательно)" onChange={(e) => setTitle(e.target.value) } />
                <AutoResizeTextArea inputName={"description"} inputPlaceholder={"Напиши что-нибудь..."} inputState={setDescription} />
                <div className={styles.inputButtons}>
                    <input type="image" />
                    <input type="file" />
                </div>
            </div>
            <Button text="Отправить" click={handleSubmit} />
        </div>
    );
}
