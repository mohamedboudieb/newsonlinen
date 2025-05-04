import React, { useEffect, useState } from 'react'

export default function UseCustom(url) {

const [x,setx]=useState([]);
useEffect(()=>{

    fetch(url, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => setx(json))


},[])

    return (
    [x]
    )
}
