import React from "react";
import NavBar from "./NavBar";
import { getAllDogs,getDogByName } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import DogCard from "./DogCard";
import home from '../styles/Home.module.css'
import Paginado from './pages'; 
const Home = () =>{
  let dogs = useSelector(state => state.dogs)
  console.log(dogs)
  let [input,setInput] = React.useState({
    name:""
  })
  console.log(typeof input.name)
  const dispatch= useDispatch();
  let [currentPage,setCurrentPage] = React.useState(1)
  let [dogsPerPage,setDogsPerPage] = React.useState(8)
  const indexOfLastDog = currentPage * dogsPerPage; 
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; //
  const currentDogs = dogs.slice(indexOfFirstDog,indexOfLastDog)
  

  const paginado = (pageNumber) =>{
    setCurrentPage(pageNumber)
  }




  let handleChange= (e) =>{
    e.preventDefault();
    setInput((prev) => ({...prev,[e.target.name]:e.target.value}))

    
    dispatch(getAllDogs(e.target.value))
    console.log(e.target.value)
  }

  let handleSubmit= (e) =>{
  e.preventDefault();
}

  React.useEffect(()=>{
    
    dispatch(getAllDogs(input.name));
    
  },[dispatch,input])
  

  
  
    return (
      <React.Fragment>
        
        <form className="filter" onSubmit={e=> handleSubmit(e)}>
          <h3>Filter by:</h3>
        <label>Name</label>
        <input type={"text"} name={"name"} value={input.name}
        onChange={(e)=> handleChange(e)} />
        <label>Temperament/s</label>
        <input type="text" name="temperament" />
        <button type="submit" >Search</button>
        <select name="" id="alfabetic" placeholder="Ascendant/Descentent">
    
          <option value="ascendant">Ascendant</option>
          <option value="descentent">descendent</option>
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
  
}


export default Home;