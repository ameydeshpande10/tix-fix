import { useState, useEffect } from "react";
import Axios from "axios";

export default function MovieDetailsIndividual(movieId) {
  const [data, setData] = useState([]);
  useEffect(() => {
    Axios.get(`/movie/details/${movieId.id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return data;
}
