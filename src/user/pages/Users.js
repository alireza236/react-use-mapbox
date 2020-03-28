import React, { useState, useEffect } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hooks'

const Users = () => {
  
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [ loadedUsers, setLoadedusers ] = useState([])

  useEffect(()=>{
    const fetchUsers = async ()=>{
      try {
       
       const responseData = await sendRequest('http://localhost:5000/api/users')
  
       setLoadedusers(responseData.users)
 
     } catch (error) {}
   } 
     fetchUsers()
  },[sendRequest])

  

  return (
    <div>
      <ErrorModal error={error} onClear={clearError}/>
      { isLoading && (
        <div className="center">
           <LoadingSpinner/>
        </div>
        ) 
      }
      
      { !isLoading && loadedUsers && ( 
        <UsersList items={loadedUsers} /> ) 
      }
      
    </div>
  );
};

export default Users;
