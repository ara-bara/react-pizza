import { useNavigate } from "react-router-dom";

const BackLink = ({ to = "/", state, children, className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to, state ? { state } : undefined);
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export default BackLink;
