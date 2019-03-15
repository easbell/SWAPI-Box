import React from 'react';

const fetchCalls = (link) => {
  return fetch(link)
    .then(response => {
     if(!response.ok) {
       throw new Error('Response not ok')
     } 
     return response.json()
  })
}

export { fetchCalls }