import React from "react";
import { NavLink } from "react-router-dom";
import MovieData from "../movies-home/movie-data";
import Axios from "axios";
import "../movies.css";

export const UpcomingMovies = (props) => {
  const button = "Movie Details";
  var button_class = "btn btn-primary";
  var url = "moviedetails";
  // if (props.data !== "Movie Details") {
  //   button_class = "btn btn-danger";
  //   url = "delmovie";
  // }
  const movies = MovieData();

  try {
    const allMovies = movies.data.map(function (data) {
      const id = data._id;
      const name = data.name;
      const actors_name = data.actors;
      const director = data.director;
      const image = data.image;

      var now = new Date();
      var release_date = new Date(data.release_date);
      //console.log("movie relese : " + release_date);
      //console.log("now : " + now);
      if (release_date > now) {
        // console.log(image);
        var base64 = btoa(
          new Uint8Array(data.image.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const handleChange = (event) => {
          if (button !== "Movie Details") {
            Axios.delete(`/delmovie/${id}`);
          }
        };

        return (
          <>
            <div key={name} className="">
              <div
                className="card mt-5 me-5 rounded"
                style={{
                  borderTopLeftRadius: "5rem",
                  borderBottomLeftRadius: "5rem",
                }}
              >
                {/* <img src={`data:image/png;base64,${base64}`} className="card-img-top card_image" alt="Not found" /> */}
                <img
                  src={image}
                  className="card-img-top card_image"
                  alt="Not found"
                />
                <div className="card-body shadow card-body">
                  <p className="text-capitalize">
                    <label className="me-2 fw-bold">Movie:</label>
                    {name}
                  </p>
                  <p>
                    <label className="me-2 fw-bold">Actors:</label>
                    {actors_name}
                  </p>
                  <p>
                    <label className="me-2 fw-bold">Director:</label>
                    {director}
                  </p>
                  <button className="btn">
                    <NavLink to={`/${url}/${id}`} className={button_class}>
                      {button}
                    </NavLink>
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      }
    });
    return [allMovies];
  } catch (e) {
    return null;
  }
};

// if (props.data !== "Movie Details") {
//   return (
//     <>
//       <div className="container mt-5 movie_container">
//         <div className="movie_cards">
//           <div
//             className="card mt-5 me-5"
//             style={{
//               borderTopLeftRadius: "5rem",
//               borderBottomLeftRadius: "5rem",
//             }}
//           >
//             {/* <img src={image} className="card-img-top card_image" alt="Not found" /> */}
//             {/* <img src={`data:image/jpeg;base64,${base64}`} className="card-img-top card_image" alt="Not found" /> */}
//             {/* <img width='500' height='200' src={`data:image/png;base64,${image}`} alt="Not found" /> */}
//             {/* <img width='500' height='200' src={URL.createObjectURL(`data:image/png;base64,${image}`)} alt="Not found" /> */}
//             <div className="card-body shadow">
//               <p className="text-capitalize">
//                 <label className="me-2 fw-bold">Movie:</label>
//                 {name}
//               </p>
//               <p>
//                 <label className="me-2 fw-bold">Actors:</label>
//                 {actors_name}
//               </p>
//               <p>
//                 <label className="me-2 fw-bold">Director:</label>
//                 {director}
//               </p>
//               <button className={button_class} onClick={handleChange}>
//                 {button}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// } else {
//   return (
//     <>
//       <div className="container mt-5 movie_container">
//         <div className="movie_cards">
//           <div className="">
//             <div
//               className="card mt-5 me-5 rounded"
//               style={{
//                 borderTopLeftRadius: "5rem",
//                 borderBottomLeftRadius: "5rem",
//               }}
//             >
//               {/* <img src={`data:image/png;base64,${base64}`} className="card-img-top card_image" alt="Not found" /> */}
//               <img
//                 src={image}
//                 className="card-img-top card_image"
//                 alt="Not found"
//               />
//               <div className="card-body shadow">
//                 <p className="text-capitalize">
//                   <label className="me-2 fw-bold">Movie:</label>
//                   {name}
//                 </p>
//                 <p>
//                   <label className="me-2 fw-bold">Actors:</label>
//                   {actors_name}
//                 </p>
//                 <p>
//                   <label className="me-2 fw-bold">Director:</label>
//                   {director}
//                 </p>
//                 <NavLink to={`/${url}/${id}`} className={button_class}>
//                   {button}
//                 </NavLink>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
