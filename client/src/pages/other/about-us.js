import React from "react";

export const Aboutus = () => {
  return (
    <div className="container-fluid">
      <div className="container">
        <br></br>
        <h1>Contact Us at </h1>
        <div className="col-lg-8 offset-lg-1 row_content">
          {/* phone no */}
          <div className="contact_info_item d-flex justify-content-start align-items-center  px-3 py-2">
            {/* <img src="" alt="phone " /> */}
            <div className="contact_info_content">
              <div className="contact_info_title">Phone</div>
              <div className="contact_info_text">+91 111 222 3333</div>
            </div>
          </div>
          {/* email */}
          <div className="contact_info_item d-flex justify-content-start align-items-center  px-3 py-2">
            {/* <img src="" alt="phone " /> */}
            <div className="contact_info_content">
              <div className="contact_info_title">Email</div>
              <div className="contact_info_text">example@gmail.com</div>
            </div>
          </div>
          {/* address */}
          <div className="contact_info_item d-flex justify-content-start align-items-center  px-3 py-2">
            {/* <img src="" alt="phone " /> */}
            <div className="contact_info_content ">
              <div className="contact_info_title">Address</div>
              <div className="contact_info_text">Pune, Maharashtra, India</div>
              <br></br>
              {/* <button className="seat-btn">A1</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="contact_form">
  <div className="container">
    <div className="row">
      <div className="col-lg-10 offset-lg-1 ">
        <div className="contact_form_container py-5 shadow text-center">
          <h2 className="mx-3">Get in touch</h2>
          <form id="contact_form">
            <div className="contact_form_name d-flex justify-content-between align-items-center mx-5 px-5">
              <div className="form-group mt-3">
                {/* <label for="email">Enter Email</label> 
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter name"
                />
              </div>
              <div class="form-group mt-3">
                {/* <label for="email">Enter Email</label> 
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group mt-3">
                {/* <label for="email">Enter Email</label> 
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPhone"
                  placeholder="Enter phone"
                />
              </div>
            </div>
            <div className="form-floating my-5 mx-5 px-5">
              <textarea
                className="form-control"
                id="floatingTextarea2"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>; 
*/
}
