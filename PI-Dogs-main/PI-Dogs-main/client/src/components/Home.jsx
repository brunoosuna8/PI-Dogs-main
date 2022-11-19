import React from "react";
import NavBar from "./NavBar";
import { getAllDogs,getDogByName } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import DogCard from "./DogCard";
import home from '../styles/Home.module.css'
const Home = () =>{
  let [input,setInput] = React.useState({
    name:""
  })

  const dispatch= useDispatch();


  let handleChange= (e) =>{
    e.preventDefault();
    setInput((prev) => ({...prev,[e.target.name]:e.target.value}))
    
    dispatch(getAllDogs(e.target.value))
    
}
let handleSubmit= (e) =>{
  e.preventDefault();
  console.log(input.value)
}
  React.useEffect(()=>{
    dispatch(getAllDogs());
  },[])

  let dogs = useSelector(state => state.dogs)
  
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
          
          {dogs &&
            dogs.map((dog) => {
              //console me dice que cada child teiene q tener una key para ya la tiene nose q onda

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
      </React.Fragment>
    );
  
}


export default Home;