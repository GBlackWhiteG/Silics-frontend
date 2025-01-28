import { useRef, useState, type TextareaHTMLAttributes } from "react";

interface AutoResizeTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputName: string;
  inputPlaceholder: string;
  inputState: (value: string) => void;
}

export const AutoResizeTextArea = ({ inputName, inputPlaceholder, inputState, ...props }: AutoResizeTextAreaProps) => {
  const [isActive, setIsActive] = useState(false);
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    inputState(event.target.value);
    setContent(event.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
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
      {...props}
      className="bg-background"
    ></textarea>
  );
};
