/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { theme } from "../../../theme";
import { getTextAreaStyles } from "./TextArea.style";

interface TextAreaProps {
  limit: number;
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ limit, value, onChange }) => {
  const [text, setText] = useState(value);
  const [remaining, setRemaining] = useState(limit);
  const style = getTextAreaStyles(theme);

  useEffect(() => {
    setText(value);
    setRemaining(limit - value.split(/\s+/).length);
  }, [value, limit]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    const wordCount = inputText.trim().split(/\s+/).length;
    const remainingWords = limit - wordCount;

    if (remainingWords >= 0) {
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
      </div>
    </div>
  );
};

export default TextArea;
