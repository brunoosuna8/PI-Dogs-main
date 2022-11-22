import React from "react";
import NavBar from "./NavBar";
import {
  getAllDogs,
  getTemperaments,
  filterByTempers,
  getOrdered,
} from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import DogCard from "./DogCard";
import home from "../styles/Home.module.css";
import Paginado from "./pages";
const Home = () => {
  let dogs = useSelector((state) => state.dogs);
  let temperaments = useSelector((state) => state.temperaments);

  let [tempersSelected, setTempersSelected] = React.useState({
    temperaments: [],
  });
  let [input, setInput] = React.useState({
    name: "",
  });
  let [alfabetic, setAlfabetic] = React.useState({
    state: "ascendant",
  });
  const dispatch = useDispatch();
  let [currentPage, setCurrentPage] = React.useState(1);
  let [dogsPerPage, setDogsPerPage] = React.useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; //
  let currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //si lleva seg parametro,devolver solos los tempers q coincidan
    dispatch(getAllDogs(e.target.value));
  };

  let handleSubmit = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    if (!dogs.length) {
      dispatch(getAllDogs(input.name));
    }

    dispatch(getTemperaments());
  }, [dispatch, input, tempersSelected]);

  let handleChangeSelect = (e) => {
    if (!tempersSelected.temperaments.includes(e.target.value)) {
      let str =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);

      let newTempers = {
        ...tempersSelected,
        temperaments: [...tempersSelected.temperaments, str],
      };

      setTempersSelected(newTempers);

      dispatch(filterByTempers(newTempers.temperaments));
    }
  };

  let handleDeleteTemper = (e) => {
    let updated = tempersSelected.temperaments.filter(
      (temper) => temper !== e.target.value)
    setTempersSelected((prev) => ({
      ...prev,
      temperaments: tempersSelected.temperaments.filter(
        (temper) => temper !== e.target.value
      ),
      
    }));
    dispatch(filterByTempers(updated));
    console.log(tempersSelected.temperaments)
  };
  let handleAlfabetic = (e) => {
    let state = e.target;
    console.log(state.value);
    let obj = { state: state.value };
    setAlfabetic(obj);
    dispatch(getOrdered(obj));
  };
  return (
    <React.Fragment>
      <form className="filter" onSubmit={(e) => handleSubmit(e)}>
        <h3>Filter by:</h3>
        <label>Name</label>
        <input
          type={"text"}
          name={"name"}
          value={input.name}
          onChange={(e) => handleChange(e)}
        />
        <label>Temperament/s</label>

        <select
          onChange={(e) => handleChangeSelect(e)}
          name="temperament"
          id="temperament"
          multiple
          size="10"
        >
          {temperaments &&
            temperaments.map((temper) => (
              <option value={temper.name} name="temperaments" key={temper.id}>
                {temper.name}
              </option>
            ))}
        </select>
        <div className="selected-tempers">
          <h2>Selected Temperaments</h2>

          {tempersSelected.temperaments &&
            tempersSelected.temperaments.map((temper) => (
              <div>
                <h4>{temper}</h4>
                <button
                  className="close"
                  value={temper}
                  onClick={(e) => handleDeleteTemper(e)}
                >
                  X
                </button>
              </div>
            ))}
        </div>

        <button type="submit">Search</button>
        <select
          onChange={(e) => handleAlfabetic(e)}
          name="alfabetic"
          id="alfabetic"
          placeholder="Ascendant/Descentent"
        >
          <option hidden disabled selected value>
            Alfabetic Order
          </option>

          <option name="ascendente" value={"ascendente"}>
            Ascendant
          </option>
          <option name="descendente" value={"descendente"}>
            Descendent
          </option>
        </select>
      </form>

      <div className={home.dogs}>
        {currentDogs &&
          currentDogs.map((dog) => {
            return (
              <DogCard
                key={dog.id}
                id={dog.id}
                name={dog.name}
                temperament={dog.temperament}
                weight={dog.weight}
                height={dog.height}
                image={dog.image?.url}
              />
            );
          })}
      </div>
      <Paginado
        dogsPerPage={dogsPerPage}
        dogs={dogs.length}
        paginado={paginado}
      ></Paginado>
    </React.Fragment>
  );
};

export default Home;
