import { TextareaAutosize, Typography } from "@mui/material";
import { useState } from "react";

const EditableField = (props: any) => {
  const [text, setText] = useState(props.text);
  const [isNameFocused, setIsNamedFocused] = useState(false);

  return (
    <div>
      {!isNameFocused ? (
        <Typography
          style={{ fontSize: "25px" }}
          onClick={() => {
            setIsNamedFocused(true);
          }}
        >
          {text}
        </Typography>
      ) : (
        <TextareaAutosize
          autoFocus
          style={{ fontSize: "25px", width: "80%", resize: "none" }}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onBlur={(event) => setIsNamedFocused(false)}
        />
      )}
    </div>
  );
};

export default EditableField;
