import React from 'react';
import PlaceItem from "./PlaceItem"
import "./PlaceList.css"

import Card from "../../shared/components/UIElements/Card"
import Button from '../../shared/components/FormElements/Button';

const PlaceList = ({items, onDeletePlace, langitude, latitude}) => {
    if (items.length === 0) {
        return(
            <div className="place-list center">
                <Card>
                    <h3>
                        No Places found, Maybe create one ?
                    </h3>
                    <Button to="/places/new">
                        share place
                    </Button>
                </Card>
            </div>
        )
    }
    return ( 
        <ul className="place-list">
            {items.map((place)=> (
              <PlaceItem 
                key={place.id} 
                id={place.id}
                image={place.image}
                title={place.title}
                description={place.description}
                address={place.address}
                creatorId={place.creator}
                coordinates={place.location}
                onDelete={onDeletePlace}
                langitude={langitude}
                latitude={latitude}
                />
            ))}
        </ul>    
    );
}
 
export default PlaceList;