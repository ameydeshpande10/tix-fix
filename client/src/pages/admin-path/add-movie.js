import React, { useState } from "react";
import FileBase64 from "react-file-base64";

export const AddMovie = () => {
  const [message, setMessage] = useState("");
  //
  const [item, setItem] = useState({
    name: "",
    actors: "",
    director: "",
    certification: "",
    genre: "",
    length: "",
    release_date: "",
    start_date: "",
    end_date: "",
    first_show: "",
    second_show: "",
    image: "",
  });
  // const [items, setItems] = useState([])
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setItem({ ...item, [name]: value, image: e.target.file });
  };

  const postData = async (e) => {
    e.preventDefault();
    const {
      name,
      actors,
      director,
      certification,
      genre,
      movie_length,
      release_date,
      image,
    } = item;
    const res = await fetch("/movie/add-movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        actors,
        director,
        certification,
        genre,
        movie_length,
        release_date,
        image,
      }),
    });
    const result = await res.json();
    console.log(result);
    setMessage(result.message);
  };
  return (
    <div>
      <form className="form-control p-2" method="post">
        <div
          className="container d-flex justify-content-center mt-5 p-2"
          style={{ width: "70vw" }}
        >
          <div className="card" style={{ width: "40vw" }}>
            <div className="mt-2 mx-5">
              <div className="mb-3">
                <label className="form-label">Movie Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="exampleFormControlInput1"
                  required
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Movie Actors</label>
                <input
                  type="text"
                  name="actors"
                  className="form-control"
                  id="exampleFormControlInput1"
                  required
                  onChange={handleInputs}
                />
              </div>
              <div className="">
                <label className="form-label">Movie Director</label>
                <input
                  type="text"
                  name="director"
                  className="form-control"
                  id="exampleFormControlInput1"
                  required
                  onChange={handleInputs}
                />
              </div>
              <div className="row">
                <div className="col">
                  <label className="form-label">Movie Certification</label>
                  <input
                    type="text"
                    name="certification"
                    className="form-control"
                    id="exampleFormControlInput1"
                    required
                    onChange={handleInputs}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Movie Genre</label>
                  <input
                    type="text"
                    name="genre"
                    className="form-control"
                    id="exampleFormControlInput1"
                    required
                    onChange={handleInputs}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Movie Length</label>
                  <input
                    type="number"
                    name="length"
                    className="form-control"
                    id="exampleFormControlInput1"
                    required
                    onChange={handleInputs}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label className="form-label">Movie Release Date</label>
                  <input
                    type="date"
                    name="release_date"
                    className="form-control"
                    id="exampleFormControlInput1"
                    required
                    onChange={handleInputs}
                  />
                </div>
                {/* <div className="col">
                  <label className="form-label">Availabe from</label>
                  <input
                    type="date"
                    name="start_date"
                    className="form-control"
                    id="exampleFormControlInput1"
                    required
                    onChange={handleInputs}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Available to</label>
                  <input
                    type="date"
                    name="end_date"
                    className="form-control"
                    id="exampleFormControlInput1"
                    required
                    onChange={handleInputs}
                  />
                </div> */}
              </div>
              {/* <div className="row">
                <div className="col">
                  <label className="form-label">First Show</label>
                  <input
                    type="time"
                    name="first_show"
                    className="form-control"
                    id="exampleFormControlInput1"
                    required
                    onChange={handleInputs}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Second Show</label>
                  <input
                    type="time"
                    name="second_show"
                    className="form-control"
                    id="exampleFormControlInput1"
                    required
                    onChange={handleInputs}
                  />
                </div>
              </div> */}
              {/* <div className="row">
                                <input type="file" className="form-control" name="image" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={handleInputs} />
                                <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button>
                            </div> */}
              <br></br>
              <div className="row">
                <div className="col">
                  <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setItem({ ...item, image: base64 })}
                  />
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={postData}
                  >
                    Add Movie
                  </button>
                  {message && <div>{message}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
