import React from 'react';
import style from "../../css/IdeaBlock.module.css";

function IdeaBlock({ title, text }) {
  return (
    <div className={style.ideablock}>
      <h2 className={style.h2}>{title}</h2>
      <div className={style.spacer}></div>
      <p className={style.p}>{text}</p>
    </div>
  );
}

export default React.memo(IdeaBlock);
