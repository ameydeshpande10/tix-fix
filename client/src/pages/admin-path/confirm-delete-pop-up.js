import React from "react";

export const ConfirmDeletePopUp = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {props.children}
        <h2> you are about to delete a movie</h2>
        <br></br>
        <div className="row">
          <div className="col">
            <button className="btn btn-danger col-10">Confirm</button>
          </div>
          <div className="col">
            <button className="btn btn-primary col-10">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
