import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import logo from "../../components/assets/logo.svg";
import { Search } from "../../components";
import { CreateCard } from "../../components";
import { Card } from "../../components";
import { getAllLists, updateFavoriteStatus } from "../../service/ServiceCard"; // Importe o serviço aqui

//import icons
import { IoMdClose } from "react-icons/io";

const HomePage = () => {
  const [lists, setLists] = useState<any[]>([]); // Estado para armazenar as listas
  const [error, setError] = useState<string | null>(null); // Estado para armazenar mensagens de erro

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLists();
        setLists(data); // Armazene os dados no estado
      } catch (error: any) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Erro desconhecido ao buscar listas');
        }
      }
    };

    fetchData();
  }, []);

    // Filtragem das listas
    const favoriteLists = lists.filter(list => list.is_favorite === 1);
    const otherLists = lists.filter(list => list.is_favorite === 0);

    const updateFavorite = async (id: number, isFavorite: number) => {
      try {
        await updateFavoriteStatus(id, isFavorite); 
        // Chama a função do serviço para atualizar o estado de favorito no back-end
        const updatedLists = lists.map(list => {
          if (list.id === id) {
            return { ...list, is_favorite: isFavorite };
          }
          return list;
        });
        setLists(updatedLists); // Atualiza o estado local com a nova informação de favorito
      } catch (error) {
        setError('Erro ao atualizar estado de favorito');
      }}

  return (
    <main>
      <header>
        <div>
          <img src={logo} alt="Logo" />
          <h1 className={styles.text}>CoreNotes</h1>
          <Search placeholder="Pesquisar Notas" />
          <IoMdClose className={styles.searchIcon} />
        </div>
      </header>

      { error && <div className={styles.error}>{error}</div> }

      <div className={styles.container}>
        <CreateCard 
          title="Título" 
          placeholder="Criar nota..." 
          onChange={() => {}}
          className={styles.teste}
          >
        </CreateCard>

        <h2>Favoritas</h2>

        <div className={styles.favorite}>
          {/* Mapeie as listas recebidas para os cards */}
          {favoriteLists.map(list => (
            <Card
              placeholder="Clique ou arraste o arquivo para esta área para fazer o upload"
              id={list.id}
              title={list.title}
              description={list.description}
              color={list.color}
              isFavorite={list.is_favorite}
              updateFavorite={updateFavoriteStatus}
            />
          ))}
        </div>

        <h2>Outras</h2>
        
        <div className={styles.favorite}>
          {/* Aqui você pode adicionar outros cards */}
          {otherLists.map(list => (
            <Card
              placeholder="Clique ou arraste o arquivo para esta área para fazer o upload"
              id={list.id}
              title={list.title}
              description={list.description}
              color={list.color}
              isFavorite={list.is_favorite}
              updateFavorite={updateFavoriteStatus}
            />
          ))}
        </div>
      </div>
    </main>
  )
};

export default HomePage;