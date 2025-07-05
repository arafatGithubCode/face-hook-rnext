import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../../assets/icons";
import { useAuth } from "../../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogout = () => {
    // TODO:
    // clear the token and logout
    setAuth({});
    navigate("/login");
  };
  return (
    <button onClick={handleLogout} className="icon-btn">
      <img src={LogoutIcon} alt="Logout" />
    </button>
  );
};

export default Logout;
