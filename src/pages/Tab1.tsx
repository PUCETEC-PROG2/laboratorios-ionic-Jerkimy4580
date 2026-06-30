import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

import "./Tab1.css";
import { fetchRepositories, deleteRepository, updateRepository } from "../services/GithubSevices";
import type { Repository } from "../interfaces/Repository";
import LoginSpinner from "../components/LoadingSpinner";
import RepoItem from "../components/RepoItem"; // Asegúrate de que la ruta sea correcta

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchRepos = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const repos = await fetchRepositories();
      setRepositoryList(repos);
    } catch (error) {
      console.error("Error obteniendo repositorios", error);
      setErrorMsg("Error obteniendo repositorios: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchRepos();
  });

  // Manejador para eliminar el repositorio mediante la API y del estado local
  const handleDeleteRepository = async (owner: string, repoName: string) => {
    try {
      const success = await deleteRepository(owner, repoName);
      if (success) {
        // Filtramos el estado para remover el elemento visualmente
        setRepositoryList((prevList) => 
          prevList.filter((repo) => !(repo.owner.login === owner && repo.name === repoName))
        );
      }
    } catch (error) {
      console.error("Error al eliminar", error);
      alert("No se pudo eliminar el repositorio: " + (error as Error).message);
    }
  };

  // Manejador para editar (Ejemplo base, puedes abrir un modal aquí)
  const handleEditRepository = async (owner: string, repoName: string) => {
    const nuevoNombre = prompt("Introduce el nuevo nombre para el repositorio:", repoName);
    if (!nuevoNombre || nuevoNombre.trim() === "") return;

    try {
      // Aquí puedes mapear el payload que acepte tu interfaz RepositoryPayload
      const updatedData = await updateRepository(owner, repoName, { name: nuevoNombre });
      
      if (updatedData) {
        // Actualizamos el estado local con la respuesta de la API
        setRepositoryList((prevList) =>
          prevList.map((repo) =>
            repo.owner.login === owner && repo.name === repoName ? { ...repo, ...updatedData } : repo
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar", error);
      alert("No se pudo actualizar el repositorio: " + (error as Error).message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className='ion-padding'>
        {loading ? (
          <LoginSpinner />
        ) : errorMsg ? (
          <p style={{ color: "red", padding: "1rem" }}>{errorMsg}</p>
        ) : (
          <IonList>
            {repositoryList.map((repo) => (
              <RepoItem
                key={repo.id}
                {...repo}
                onDelete={handleDeleteRepository}
                onEdit={handleEditRepository}
              />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;