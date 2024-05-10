import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import backgroundImg from "../../assets/beautiful-landscape.jpg";
import { addUser, getAllUsers } from "../../redux/userSlice";
import style from "../../css/SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContextProvider";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((store) => store.userSlice);
  const { user, logout } = useContext(UserContext);

  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    password: "",
    login: "",
    avatarImage: "https://github.com/MargaritaPeresypkina/travelroutesapi/raw/master/avatar.jpg",
    isAgreeToTravel: true,
  });

  useEffect(() => {
    if(user){
      logout();
    }
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  
  // Проверка на ошибки при изменении значения поля
  validateField(e.target.name, e.target.value);
  checkForDuplicateData(e.target.name, e.target.value);
};

const checkForDuplicateData = (name, value) => {
  switch (name) {
    case "email":
      const existingEmail = value && users.some((user) => user.email === value);
      if (existingEmail) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email already exists. Please enter a different email.",
        }));
      } else {
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: emailRegex.test(value) ? "" : "Invalid email format.",
        }));
      }
      break;
    case "login":
      const existingLogin = value && users.some((user) => user.login === value);
      if (existingLogin) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          login: "Login already exists. Please enter a different login.",
        }));
      } else {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          login: value ? "" : "Login is required.",
        }));
      }
      break;
    default:
      break;
  }
};
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          name: value ? "" : "Name is required.",
        }));
        break;
      case "password":
        const passwordRegex = /^(?=.*[A-Za-z])[A-Za-z0-9]+$/;
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          password: passwordRegex.test(value)
            ? ""
            : "Password must contain at least 8 characters with at least one latin letter.",
        }));
        break;
      default:
        break;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Проверка наличия ошибок перед отправкой данных
      const hasErrors = Object.values(fieldErrors).some((error) => error !== "");
      if (hasErrors) {
        return;
      }
  
      // Проверка на наличие только латинских букв и цифр в полях login, email и password
      const latinRegex = /^[a-zA-Z0-9]+$/;
      if (!latinRegex.test(formData.login)) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          login: "Login should contain only Latin letters and digits.",
        }));
        return;
      }
      const existingEmail =
        formData.email &&
        users.some((user) => user.email === formData.email);
      if (existingEmail) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email already exists. Please enter a different email.",
        }));
        return;
      }
  
      const existingLogin =
        formData.login &&
        users.some((user) => user.login === formData.login);
      if (existingLogin) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          login: "Login already exists. Please enter a different login.",
        }));
        return;
      }
  
      // Вызов функции addUser для отправки данных на сервер
      await dispatch(addUser(formData));
  
      navigate("/start/login");
    } catch (err) {
      setFormError(err.message);
    }
  };
  

  return (
    <div
      className={style.background}
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <h2>Sign Up</h2>
      {formError && <p className={style.error}>{formError}</p>}
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {fieldErrors.name && <p className={style.error}>{fieldErrors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {fieldErrors.email && (
          <p className={style.error}>{fieldErrors.email}</p>
        )}
        <input
          type="text"
          name="login"
          placeholder="Login"
          value={formData.login}
          onChange={handleChange}
          required
        />
        {fieldErrors.login && (
          <p className={style.error}>{fieldErrors.login}</p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {fieldErrors.password && (
          <p className={style.error}>{fieldErrors.password}</p>
        )}
        <button type="submit" onClick={handleSubmit} className={style.button}>
          Sign Up
        </button>
      </form>
      <div className={style.registerLink}>
        <p>Вы уже зарегистрированы? | <Link to="/start/login">Перейти на страницу Log In</Link></p>
      </div>
    </div>
  );
};

export default React.memo(SignUp);
