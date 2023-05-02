import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";

const Toggleable = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  useImperativeHandle(refs, () => ({ toggleVisibility }));

  return (
    <div>
      {visibility ? (
        <>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </>
      ) : (
        <button onClick={toggleVisibility} id="show-blog-form-btn">
          {props.buttonLabel}
        </button>
      )}
    </div>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;
