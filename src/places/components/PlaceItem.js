import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from "../../shared/components/UIElements/Modal"
import Map from '../../shared/components/UIElements/Map';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { AuthContext } from "../../shared/context/auth-context"
import { useHttpClient } from '../../shared/hooks/http-hooks';

import "./PlaceItem.css"

const PlaceItem = ({ id,image, title, address, description,coordinates, zoom, onDelete, langitude, latitude, creatorId }) => {

    const { isLoading, sendRequest, error, clearError } = useHttpClient()

    const auth = useContext(AuthContext)

    const [showMap, setShowMap] = useState(false)
    
    const [ showConfirmModal, setShowConfirmModal ] = useState(false)

    const openMapHandler = ()=> setShowMap(true)
    
    const closeMapHandler = ()=> setShowMap(false)

    const showDeleteWarningHandler = ()=>{
        setShowConfirmModal(true)
    }

    const cancelDeleteHandler = ()=>{
        setShowConfirmModal(false)
    }

    const confirmDeleteHandler = async () =>{
        setShowConfirmModal(false)
         try {
             await sendRequest(`http://localhost:5000/api/places/${id}`,'DELETE')
             onDelete(id)
         } catch (error) {}
    }
    
    return ( 
       <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>   
        <Modal 
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        zoom={zoom}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
       >
         <div className="map-container">
            <Map
                center={coordinates} 
                zoom={16} 
                title={title} 
                address={address}
                langitude={langitude} 
                latitude={latitude}
                />
         </div>
      </Modal> 
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure ?"
        footerClass="place-item__modal-actions" 
        footer={
            <React.Fragment>
                <Button inverse onClick={cancelDeleteHandler}>Cancel</Button>
                <Button danger onClick={confirmDeleteHandler}>Delete</Button>
            </React.Fragment>
        }
        >
          <strong>Do you want to proceed and delete this place ? Please note that it can be undone thereafter.</strong>
      </Modal>

        <li className="place-item">
            <Card className="place-item__content">
            
                { isLoading && (
                    <div className="center">
                        <LoadingSpinner asOverLay/>
                    </div> )}
            
            <div className="place-item__image">
                <img src={image} alt={title} />
            </div>
            <div className="place-item__info">
                <h3>{title}</h3>
                <h2>{address}</h2>
                <p>{description}</p>
            </div>
            <div className="place-item__actions">
                <Button inverse onClick={openMapHandler}>View On Map</Button>
                { auth.userId === creatorId && (
                    <Button to={`/places/${id}`}>Edit</Button>
                ) }
                { auth.userId === creatorId && (
                    <Button danger onClick={showDeleteWarningHandler}>Delete</Button>
                ) }
            </div>
            </Card>
        </li>
     </React.Fragment>
    );
}
 
export default PlaceItem;