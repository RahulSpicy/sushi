import { TextareaAutosize } from "@mui/material";
import { useState } from "react";

const EditableField = (props: any) => {
  const [desc, setDesc] = useState(props.desc);
  const [isNameFocused, setIsNamedFocused] = useState(false);

  return (
    <div>
      {!isNameFocused ? (
        <TextareaAutosize
          maxRows={3}
          value={desc}
          style={{
            resize: "none",
            width: "95%",
            height: "50px",
            padding: "0.5em",
            margin: "0.25em",
            border: "1px solid white",
            borderRadius: "5px",
            backgroundColor: "lightgray",
          }}
          onClick={() => {
            setIsNamedFocused(true);
          }}
        />
      ) : (
        <TextareaAutosize
          autoFocus
          maxRows={3}
          style={{
            resize: "none",
            width: "95%",
            height: "50px",
            padding: "0.5em",
            margin: "0.25em",
            border: "1px solid white",
            borderRadius: "5px",
            backgroundColor: "lightgray",
          }}
          value={desc}
          onChange={(event) => setDesc(event.target.value)}
          onBlur={(event) => setIsNamedFocused(false)}
        />
      )}
    </div>
  );
};

export default EditableField;
