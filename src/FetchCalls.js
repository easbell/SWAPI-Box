import React from 'react';

const FetchCalls = (link) => {
  return fetch(link)
    .then(response => {
     if(!response.ok) {
       throw new Error('Response not ok')
     } 
     return response.json()
  })
}

export { FetchCalls }