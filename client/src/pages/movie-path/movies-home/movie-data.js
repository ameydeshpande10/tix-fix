import { useState, useEffect } from "react";
import Axios from "axios";

export default function MovieData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/movies`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  });

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const dbMovies = await Axios.get("http://localhost:3001/movies");
  //     setData(dbMovies.data);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // });
  //console.log(data);
  return data;
}
