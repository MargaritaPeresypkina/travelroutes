import React from "react";
import Button from "../Button/Button";
import styles from "../../css/Footer.module.css"; 

function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.footer}>
      <div>
        <h3>Контакты:</h3>
        <div>
          <p className={styles.p}>+1234567890</p>
          <p className={styles.p}>+0987654321</p>
          <p className={styles.p}>+0987654321</p>
        </div>
      </div>

      <div>
        <h3>Почта:</h3>
        <div>
          <p className={styles.p}>routemate@gmail.com</p>
          <p className={styles.p}>routematecomunity@mail.com</p>
        </div>
      </div>

      <Button text="Наверх" onClick={handleScrollToTop} />
    </div>
  );
}

export default Footer;
