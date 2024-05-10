import { useContext} from "react";
import { UserContext } from "./UserContextProvider";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { user: contextUser, loading } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  console.log("context", contextUser)

  console.log("id", contextUser?._id)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!contextUser && location.pathname !== "/start/signup" && location.pathname !== "/start/login") {
    return <Navigate to="/start/login" replace />;
  }

  if (contextUser && (location.pathname === "/start/signup" || location.pathname === "/start/login")) {
    navigate("/"); 
    return null;
  }

  return children;
}
