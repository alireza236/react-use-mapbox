 import { useState, useCallback, useRef, useEffect } from "react" 

 export const useHttpClient = () => {
      
      const [ isLoading, setisLoading] = useState(false)
      
      const [ error,  setError ] = useState();

      const activeHttpRequest = useRef([])  

      const sendRequest = useCallback (async (url, method = 'GET', body = null, headers = {}) => {
          setisLoading(true)
          const httpAbortCtrl = new AbortController()
          activeHttpRequest.current.push(httpAbortCtrl) 
          
          try {
              const response = await fetch(url,{
                  method,
                  headers,
                  body,
                  signal: httpAbortCtrl.signal
                })
                
                const responseData = await response.json()
                
                activeHttpRequest.current = activeHttpRequest.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl)
                console.log("HTTP-HOOKS",  httpAbortCtrl.signal )
                
                if (!response.ok) {
                    throw new Error(responseData.message)   
                } 
                
                setisLoading(false)
                return responseData
                
            } catch (error) {
                setError(error.message || "Something Went wrong")     
                setisLoading(false)
                throw error;
            }

        
      }, [])

      const clearError = () => {
           setError(null)     
      }

      useEffect(()=>{
          
        return () => { 
            activeHttpRequest.current.forEach(aboutCtrl => aboutCtrl.abort()) 
        }

      }, [])

    return { isLoading, error, sendRequest, clearError };     
 }