import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { fetchOoompaLoompas, reset } from "../../slices/oompaLoompaSlice";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { hasExpired } from "../../utils/date";

function Homepage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.list);
  const [oompaLoompas, setOompaLoompas] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const expiryDate = new Date(data?.expiryDate);
    //If a day has passed since last fetch, we enforce reset and reset datae
    if (hasExpired(expiryDate)) {
      dispatch(reset());
      dispatch(fetchOoompaLoompas(data?.page));
    }
    //Used for debugging, if we mannually delete the store
    if (data?.oompaLoompasList.length === 0) {
      dispatch(fetchOoompaLoompas(data?.page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      dispatch(fetchOoompaLoompas(data.page));
    }
  };

  useEffect(() => {
    //If data has changes
    setOompaLoompas(data?.oompaLoompasList);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (filterValue !== "") {
      //Filter
      setOompaLoompas(
        data?.oompaLoompasList.filter(
          (element) =>
            element.first_name
              .toLowerCase()
              .includes(filterValue.toLowerCase()) ||
            element.last_name
              .toLowerCase()
              .includes(filterValue.toLowerCase()) ||
            element.profession.toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    } else {
      //If filter is empty, we reset to store data
      setOompaLoompas(data?.oompaLoompasList);
    }
  }, [filterValue, data]);

  return (
    <div className="container">
      <div className="action-row">
        <Input
          placeholder="Search"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
        />
      </div>
      <div className="heading">
        <h1 className="heading-centered">Find your Ooompa Loompa</h1>
        <h2 className="heading-centered text-muted">
          There are more than 100k
        </h2>
      </div>
      {oompaLoompas.length === 0 ? (
        <div className="heading heading-centered">There are no results</div>
      ) : (
        <></>
      )}
      <div className="list">
        {oompaLoompas.map((oompaLoompa, index) => (
          <Card key={index} onClick={() => navigate(`/${oompaLoompa.id}`)}>
            <div className="card-body">
              <img
                className="profile"
                src={oompaLoompa.image}
                alt={"Oompa Loompa Image for " + oompaLoompa.first_name}
              />
              <p className="card-title no-space">
                {oompaLoompa.first_name} {oompaLoompa.last_name}
              </p>
              <span className="text-muted">
                {oompaLoompa.gender === "F" ? "Female" : "Male"}
              </span>
              <br />
              <i className="text-muted">{oompaLoompa.profession}</i>
            </div>
          </Card>
        ))}
      </div>
      {data.loading ? <div className="spinner" /> : <></>}
    </div>
  );
}

export default Homepage;
