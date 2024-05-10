import React, { useState } from "react";
import styles from "./CreateCard.module.scss";

//Importar React Icon
import { IoMdStar } from "react-icons/io";

interface ICreateCard {
  placeholder: string;
  title: string;
  onChange: () => void;
  className: string;
  children?: React.ReactNode;
}

const CreateCard = (props: ICreateCard) => {
  const [starColor, setStarColor] = useState("#000000");

  const toggleStarColor = () => {
    const newColor = starColor === "#000000" ? "#EEAD2D" : "#000000";
    setStarColor(newColor);
    }

  return (
    <div className={styles.CreateCard}>

      <div className={styles.title}>
        <h2>{props.title}</h2>
        <IoMdStar className={styles.star} onClick={toggleStarColor} style={{ color: starColor }} />
      </div>

      <div className={styles["CreateCard__line"]} />
      <input type="text" placeholder={props.placeholder} />
    </div>
  )
};

export default CreateCard;