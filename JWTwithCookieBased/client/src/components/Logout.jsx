import { useNavigate } from "react-router-dom";
export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // to handle lougout
    // remove local storage token and redirect to login page
    localStorage.removeItem("token");
    console.log("Token removed, redirecting to login.");
    navigate("/login");
  };
  return <button onClick={handleLogout}>Logout</button>;
}
