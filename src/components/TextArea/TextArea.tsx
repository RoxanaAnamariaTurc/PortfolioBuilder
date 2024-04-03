import React, { useState } from "react";
import { theme } from "../../theme";

interface TextAreaProps {
  limit: number;
  value: string;
  onChange: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ limit, value, onChange }) => {
  const [text, setText] = useState("");
  const [remaining, setRemaining] = useState(limit);

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
      <textarea value={text} onChange={handleChange} rows={4} cols={50} />
      <div
        style={{ color: theme.colors.primary, marginLeft: theme.sizes.small }}
      >
        Words remaining: {remaining}
        {remaining <= 0 && (
          <span style={{ color: "red" }}>You have exceeded the limit!</span>
        )}
      </div>
    </div>
  );
};

export default TextArea;
