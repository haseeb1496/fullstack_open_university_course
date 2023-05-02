import { useSelector } from "react-redux";

const ErrorMessage = () => {
  const error = useSelector((state) => state.error);

  return error ? <div className="error">{error}</div> : null;
};
export default ErrorMessage;
