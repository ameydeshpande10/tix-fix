import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import axios from "axios";

export const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function logout() {
      await axios
        .get("http://localhost:3001/user/log-out", {})
        .then((res) => {
          dispatch({ type: "USER", payload: false });
          navigate("/Movies", { replace: true });
          localStorage.clear();
          if (res.status !== 200) {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    logout();
  });
};
