import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../redux/userSlice";
import style from "../../css/LogIn.module.css";
import backgroundImg from "../../assets/beautiful-landscape.jpg";
import { UserContext } from "../../UserContextProvider";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((store) => store.userSlice);
  const { user, onChange: setUserContext, logout } = useContext(UserContext);

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if(user){
      logout();
    }
    dispatch(getAllUsers());
    
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 

  const handleLogin = () => {
    const { login, password } = formData;
    const foundUser = users.find(
      (user) => user.login === login && user.password === password
    );
    if (foundUser) {

      setUserContext(foundUser);
      
      navigate("/"); 
    } else {
      setError("Неправильный login или пароль.");
    }
  };

  return (
    <div className={style.background} style={{ backgroundImage: `url(${backgroundImg})` }}>
      <h2>Log In</h2>
      {error && <p className={style.error}>{error}</p>}
      <form className={style.form}>
        <input
          type="login"
          name="login"
          placeholder="Login"
          value={formData.login}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={handleLogin} className={style.button}>
          Log In
        </button>
      </form>
      <div className={style.registerLink}>
        <p>
          Вы ещё не зарегистрированы? |{" "}
          <Link to="/start/signup">Перейти на страницу Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default React.memo(LogIn);
