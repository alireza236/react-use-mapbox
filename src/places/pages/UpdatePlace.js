import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom"

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

import { useForm } from "../../shared/hooks/form-hook"
import { useHttpClient } from '../../shared/hooks/http-hooks';
import { AuthContext } from '../../shared/context/auth-context';

import './PlaceForm.css';

  const UpdatePlace = () => {

    const auth =  useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ loadedPlace, setLoadedPlaces ] = useState();

    let { placeId } = useParams()
    
    let history = useHistory();
    
    const [ formState , inputHandler, setFormData ] =  useForm({
        title:{
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false)
    
    useEffect(() => {

        const fetchPlace = async() =>{
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`)
                    setLoadedPlaces(responseData.place)
                    setFormData({
                        title:{
                            value: responseData.place.title,
                            isValid: true
                        },
                            description: {
                            value: responseData.place.description,
                            isValid: true
                        }
                }, true);  
            } catch (error) {}
        }

        fetchPlace()
        
    }, [ sendRequest, placeId, setFormData ])

    console.log("FORM STATE",JSON.stringify(formState.inputs,null,2))
    
    const placeUpdateSubmitHandler = async (event)=>{
        event.preventDefault()
         try {
             await sendRequest(`http://localhost:5000/api/places/${placeId}`,'PATCH', JSON.stringify({
                 title: formState.inputs.title.value,
                 description: formState.inputs.description.value
             }),
             { 'Content-Type': 'application/json' }
            );
            history.push('/'+ auth.userId + '/places')
         } catch (error) {}
        console.log("RESULT",JSON.stringify(formState.inputs,null,2))
    } 

    if (isLoading) {
        return(
            <div className="center">
                 <LoadingSpinner/>
            </div>
        )
    }

    if(!loadedPlace && !error){
        return(
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        )
    }


    return (
        <div className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <ErrorModal error={error} onClear={clearError}/>
            { !isLoading  && loadedPlace && (
                 <form>
                 <Input
                     id="title"
                     element="input"
                     type="text"
                     label="text"
                     validators={[ VALIDATOR_REQUIRE() ]}
                     errorText="Please enter valid title"
                     onInput={inputHandler}
                     initialValue={loadedPlace.title}
                     initialValid={true}
                 />
 
                 <Input
                     id="description"
                     element="textarea"
                     label="Description"
                     validators={[ VALIDATOR_MINLENGTH(5) ]}
                     errorText="Please enter a valid description (min. 5 character)"
                     onInput={inputHandler}
                     initialValue={loadedPlace.description}
                     initialValid={true}
                 />
 
                 <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
             </form>
            )}
           
        </div>
    );
};

export default UpdatePlace;
