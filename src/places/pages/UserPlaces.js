import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';


const UserPlaces = () => {
     
     const [ loadPlaces, setLoadedPlaces ] = useState();
     const [ langitude, setLangitude ] = useState();
     const [ latitude, setlatitude ] = useState();
     
  
     const { isLoading, error, sendRequest, clearError } = useHttpClient()

     const { userId } = useParams();
     
     console.log("USER PLACE ID",userId)
    
     useEffect(() => {
      const fetchPlaces = async () => {
        try {
          const responseData =  await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
          setLoadedPlaces(responseData.places)

          let [ place ] = await responseData.places

          setLangitude(place.location.lng)
          setlatitude(place.location.lat)
        
        } catch (error) {}
       } 
          fetchPlaces()
     },[sendRequest, userId ])
     
     const placeDeletedHandler = (deletedPlaceId) =>{
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId ))
        console.log('ID ON DELETED',deletedPlaceId)
     }

     return (
       <div>
          <ErrorModal error={error} onClear={clearError} />
          { isLoading && ( 
            <div className="center">
                <LoadingSpinner asOverLay/>
            </div>  
            ) }
          { !isLoading && loadPlaces && ( 
          <PlaceList 
              items={loadPlaces}
              onDeletePlace={placeDeletedHandler} 
              langitude={langitude} 
              latitude={latitude} 
              /> 
              )}
       </div>
     );
};

export default UserPlaces;