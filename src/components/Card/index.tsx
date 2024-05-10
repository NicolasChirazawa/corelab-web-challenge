import React, { useState, useEffect } from "react";
import styles from "./Card.module.scss";

// Importar React Icon
import { IoMdStar } from "react-icons/io";
import { LuPaintBucket } from "react-icons/lu";
import { GoPencil } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

// Importar conexão banco cor
import { updateCardColor } from "../../service/ServiceCard";

interface ICard {
  id: number;
  title: string;
  description: string;
  placeholder: string;
  color: number;
  isFavorite: number;
  updateFavorite: (id: number, isFavorite: number) => void;
}

const Card = (props: ICard) => {
  const [starColor, setStarColor] = useState("#000000");
  const [textValue, setTextValue] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  // População textarea (description)
  useEffect(() => {
    setTextValue(props.description);
  }, [props.description]);

  // Settar cor do Card
  const colors = [
    "#BAE2FF", "#B9FFDD", "#FFE8AC", "#FFCAB9", "#F99494",
    "#9DD6FF", "#ECA1FF", "#DAFF8B", "#FFA285", "#CDCDCD",
    "#979797", "#A99A7C"
  ];

  useEffect(() => {
    if (props.color >= 0 && props.color < colors.length) {
      // Define a cor do card com base no número fornecido
      setCardColor(colors[props.color]);
    }
  }, [props.color]);

  // Definição cor inicial do ícone da estrela com base no valor de isFavorite
  useEffect(() => {
    setStarColor(props.isFavorite === 1 ? "#EEAD2D" : "#000000");
  }, [props.isFavorite]);

  const toggleStarColor = () => {
    const newColor = starColor === "#000000" ? "#EEAD2D" : "#000000";
    setStarColor(newColor);

    // Atualizar Backend quando clicar na estrela
    const newFavoriteStatus = newColor === "#000000" ? 0 : 1;
    props.updateFavorite(props.id, newFavoriteStatus);
  };

  const clearTextarea = () => {
    setTextValue(""); // Limpa o conteúdo do textarea
  };

  // Funções do modal
  const handleCircleClick = async (color: string) => {
    console.log(`Círculo ${color} clicado!`);
    setIsModalOpen(false); // Fechar o modal após selecionar a cor
    setCardColor(color); // Atualizar a cor do card no estado local

    try {
      const colorIndex = colors.indexOf(color);
      if (colorIndex !== -1) { // Verifica se a cor foi encontrada
        await updateCardColor(props.id, colorIndex);
      } else {
        console.error('Cor não encontrada na array de cores:', color);
      }
    } catch (error) {
      console.error('Erro ao atualizar a cor do card:', error);
    }
  };

  const handleOpenModal = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      const iconRect = event.currentTarget.getBoundingClientRect();
      setModalPosition({
        top: iconRect.bottom + window.pageYOffset + 10, // Leva em consideração o scroll da página
        left: iconRect.left,
      });
      setIsModalOpen(true);
    }
  };

  return (
    <div className={`${styles.Card} ${styles.cardWrapper}`} style={{ backgroundColor: cardColor }}>
      <div className={styles.title}>
        <h2>{props.title}</h2>
        <IoMdStar 
          className={styles.star} 
          onClick={toggleStarColor} 
          style={{ color: starColor}}
        />
      </div>
      <div className={styles["CreateCard__line"]} />
      <textarea 
        placeholder={props.placeholder} 
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)} 
        style={{ backgroundColor: cardColor }}
      />
      <div className={styles.icons}>
        <div className={styles.editar}>
          <GoPencil />
          <LuPaintBucket
            onClick={handleOpenModal}
            className={`${isModalOpen ? styles.filledBucket : ''} ${styles.bucketIcon}`}
          />
        </div>
        <IoMdClose className={styles.erase} onClick={clearTextarea}/>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div
          className={styles.modal}
          style={{ top: modalPosition.top, left: modalPosition.left }}
        >
          <div className={styles["circle-container"]}>
            {/* Renderizar as cores ordenadas */}
            {colors.map((color, index) => (
              <div
                key={index}
                className={`${styles.circle}`}
                style={{ backgroundColor: color }}
                onClick={() => handleCircleClick(color)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
