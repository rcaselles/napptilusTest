import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../components/Card";
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
    //If a day has passed since last fetch, we enforce reset and reset datae
    if ((today - expiryDate) / msInDay > 1) {
      dispatch(reset());
      dispatch(fetchOoompaLoompas(data.page));
    }
    //Used for debugging, if we mannually delete the store
    if (data.oompaLoompas.length === 0) {
      dispatch(fetchOoompaLoompas(data.page));
    }
  }, []);

  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      dispatch(fetchOoompaLoompas(data.page));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [data]);

  return (
    <div className="container">
      <div className="action-row">a</div>
      <div className="heading">
        <h1 className="heading-centered">Find your Ooompa Loompa</h1>
        <h2 className="text-muted">There are more than 100k</h2>
      </div>
      <div className="list">
        {data.oompaLoompas.map((oompaLoompa, index) => (
          <Card>
            <div className="card-body">
              <img
                className="profile"
                src={oompaLoompa.image}
                alt="Oompa Loompa Image"
              />
              <p className="card-title no-space">
                {oompaLoompa.first_name} {oompaLoompa.last_name}
              </p>
              <span>{oompaLoompa.gender === "F" ? "Female" : "Male"}</span>
              <br />
              <i>{oompaLoompa.profession}</i>
            </div>
          </Card>
        ))}
      </div>
      {data.loading ? <div className="spinner" /> : <></>}
    </div>
  );
}

export default Homepage;
