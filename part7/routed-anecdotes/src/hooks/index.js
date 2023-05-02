import { useState } from "react";

export const useField = (name) => {
  const [value, setValue] = useState("");

  const onChange = (evt) => {
    setValue(evt.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return { name, onChange, value, reset };
};
