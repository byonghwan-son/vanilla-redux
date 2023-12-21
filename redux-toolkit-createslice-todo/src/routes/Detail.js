import React from 'react';
import {useParams} from "react-router-dom";

function Detail({...props}) {
  const id = useParams();
  console.log(id);
  return (
    <>
      <h2>Detail Page</h2>
    </>
  );
}

export default Detail;