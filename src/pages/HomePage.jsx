import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div>Home</div>
      <Link to="/me">Profile</Link>
      <br />
      <br />
      <Link to="/login">log</Link>
    </div>
  );
};

export default HomePage;
