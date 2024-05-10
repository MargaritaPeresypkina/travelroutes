import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../../css/NotFound.module.css";
import head from "../../css/HeaderBackground.module.css";
import backgroundImg from "../../assets/beautiful-landscape.jpg";
import { UserContext } from "../../UserContextProvider";
const NotFound = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <div
        className={head.headerImage}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.error}>Произошла ошибка!</p>
         {user ? (
          <Link to="/" className={styles.link}>
          Вернуться на Главную
        </Link>
        ) : (
          <Link to="/start/login" className={styles.link}>
          Перейти на страницу Log In
        </Link>
        )}
      </div>
    </div>
  );
};

export default React.memo(NotFound);
