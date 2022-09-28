import { useState, useEffect } from "react";
import Axios from "axios";

export default function MovieDetailsIndividual(movieId) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = `/moviedetails/${movieId.id}`;
    Axios.get(url)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return data;
}
