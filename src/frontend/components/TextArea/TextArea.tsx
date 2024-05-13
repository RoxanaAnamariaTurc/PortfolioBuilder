/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { theme } from "../../../theme";
import { getTextAreaStyles } from "./TextArea.style";

interface TextAreaProps {
  limit: number;
  value: string;
  onChange: (value: string) => void;
  name: string;
  id?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ limit, value, onChange }) => {
  const [text, setText] = useState(value);
  const [remaining, setRemaining] = useState(limit);
  const [isWordTooLong, setIsWordTooLong] = useState(false);
  const style = getTextAreaStyles(theme);

  useEffect(() => {
    setText(value);
    const wordCount = value.trim() === "" ? 0 : value.split(/\s+/).length;
    setRemaining(limit - wordCount);
  }, [value, limit]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    const words = inputText.trim().split(/\s+/);
    const wordCount = words.length;
    const remainingWords = limit - wordCount;

    const wordTooLong = words.some((word) => word.length > limit);
    setIsWordTooLong(wordTooLong);

    if (remainingWords >= 0 && !wordTooLong) {
      setText(inputText);
      setRemaining(remainingWords);
      onChange(inputText);
    }
  };

  return (
    <div>
      <textarea
        css={style.textarea}
        value={text}
        onChange={handleChange}
        rows={4}
        cols={50}
        name="description"
      />
      <div css={style.div}>
        Words remaining: {remaining}
        {remaining <= 0 && (
          <span css={style.span}>You have exceeded the limit!</span>
        )}
        {isWordTooLong && <span css={style.span}>Word too long!</span>}
      </div>
    </div>
  );
};

export default TextArea;
