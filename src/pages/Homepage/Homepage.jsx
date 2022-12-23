import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllOompaLoompas,
  fetchOoompaLoompas,
  reset,
} from "../../slices/oompaLoompaSlice";
import "./styles.css";

function Homepage() {
  const dispatch = useDispatch();
  const data = useSelector(selectAllOompaLoompas);

  useEffect(() => {
    const expiryDate = new Date(data.expiryDate);
    const today = new Date();
    const msInDay = 1000 * 60 * 60 * 24;
    //If a day has passed since last fetch, we enforce reset
    if ((today - expiryDate) / msInDay > 1) {
      dispatch(reset());
    }
    //If store is empty we will need to load Data
    if (data.oompaLoompas.length === 0) {
      dispatch(fetchOoompaLoompas(data.page));
    }
  }, []);

  return (
    <div className="container">
      <p>Edit src/App.j5s and save to reload.</p>
      <button onClick={() => dispatch(fetchOoompaLoompas(data.page))}>
        asd
      </button>
      {data.oompaLoompas.length}
    </div>
  );
}

export default Homepage;
