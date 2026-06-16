import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil De Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil De Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='card-container'>
          <IonCard className='card'>  
            <img
            src='https://m.media-amazon.com/images/M/MV5BYjg3M2I1YWMtMjcwNS00N2U4LThiNDMtY2IyN2VjY2EwNDRlXkEyXkFqcGc@._V1_QL75_UY281_CR31,0,500,281_.jpg'
            alt='Foto de perfil'>
            </img>
        <IonCardHeader>
          <IonCardTitle>Jeremy Arévalo</IonCardTitle>
          <IonCardSubtitle>Jeremy4580</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <p>Desarollador de software</p>
        </IonCardContent>
          </IonCard>



        </div>
      
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
