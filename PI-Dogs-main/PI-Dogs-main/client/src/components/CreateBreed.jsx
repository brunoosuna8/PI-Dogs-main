import React from "react";
import * as actions from "../actions/actions.js";
import { useDispatch, useSelector } from "react-redux";
import createBreed from "../styles/CreateBreed.module.css";
export function validate(input) {
  let errors = { name: "no data", maxMin: "no data" };

  console.log(input);

  if (
    (input.max_height <= input.min_height) ||
    (input.max_weight <= input.min_weight) ||
    (input.max_life <= input.min_life)
  ) {
    errors = {...errors,maxMin : 'Some value of max-min is incongruent'}
    
  } else {
    errors = {...errors,maxMin : 'max-min values are correct'}
  }
  if (input.name === "") {
    errors = {...errors,name : 'Name of breed is required'}
    
  } else if (!/([A-Z])/.test(input.name)) {
    errors = {...errors,name : 'Username is invalid'}
    
    
  } else {
    errors = {...errors,name : 'Name is correct'}
  }
  console.log(errors);
  return errors;
}
export default function CreateBreed() {
  let [input, setInput] = React.useState({
    name: "",
    max_height: 0,
    min_height: 0,
    max_weight: 0,
    min_weight: 0,
    max_life: 0,
    min_life: 0,
    temperaments: [],
  });
  const [errors, setErrors] = React.useState({
    name: "no data",
    maxMin: "no data",
  });
  
  const dispatch = useDispatch();
  let temperaments= useSelector((state) => state.temperaments);
  React.useEffect(() => {
    
   if(temperaments.length === 0){
    dispatch(actions.getTemperaments())
   }
  }, []);

  
  

  let handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    let weight = `${input.min_weight} - ${input.max_weight}`;
    let height = `${input.min_height} - ${input.max_height}`;
    let life_span = `${input.min_life} - ${input.max_life} yeas`;

    let obj = {
      name: input.name,
      weight,
      height,
      life_span,
      temperaments: input.temperaments,
    };

    dispatch(actions.createDog(obj));
  };

  let handleChangeSelect = (e) => {
    if (!input.temperaments.includes(e.target.value)) {
      setInput((prev) => ({
        ...prev,
        temperaments: [...input.temperaments, e.target.value],
      }));
    }
  };
  let handleDeleteTemper = (e) => {
    console.log(input.temperaments);
    console.log(e.target.value);

    setInput((prev) => ({
      ...prev,
      temperaments: input.temperaments.filter(
        (temper) => temper !== e.target.value
      ),
    }));
    console.log(input.temperaments);
  };
  return (
    <React.Fragment>
      <h1>Create Breed</h1>
      <div className={createBreed.mainContainer}>
        <form
          className={createBreed.mainForm}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className={createBreed.formDiv}>
          <h2>Registration</h2>
            <label>Name</label>
            <input
              type={"text"}
              name={"name"}
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className={createBreed.formDiv}>
            <label>Height</label>
            <input
              name={"min_height"}
              type={"number"}
              placeholder="min height"
              value={input.min_height}
              onChange={(e) => handleChange(e)}
            />
            <input
              name={"max_height"}
              type={"number"}
              value={input.max_height}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className={createBreed.formDiv}>
            <label>Weight</label>
            <input
              name={"min_weight"}
              type={"number"}
              placeholder="min weight"
              value={input.min_weight}
              onChange={(e) => handleChange(e)}
            />
            <input
              name={"max_weight"}
              type={"number"}
              placeholder="max weight"
              value={input.max_weight}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className={createBreed.formDiv}>
            <label>Life's Span</label>
            {/* van como int pero al guardarse en DB queda como strings "10 - 15 yeas" */}
            <input
              name={"min_life"}
              type={"number"}
              placeholder="min life"
              value={input.min_life}
              onChange={(e) => handleChange(e)}
            />
            <input
              name={"max_life"}
              type={"number"}
              placeholder="max life"
              value={input.max_life}
              onChange={(e) => handleChange(e)}
            />

            <select
              onChange={(e) => handleChangeSelect(e)}
              name="temperament"
              id="temperament"
              disabled={(input.temperaments.length >= 7) && true}
            >
              <option hidden disabled selected value>
                Temperaments
              </option>
              {temperaments &&
                temperaments.map((temper) => (
                  <option
                    value={temper.name}
                    name="temperaments"
                    key={temper.id}
                  >
                    {temper.name}
                  </option>
                ))}
            </select>
          </div>
          <input
          className={createBreed.submit}
            type="submit"
            value={"Create Breed"}
            disabled={errors.name !== 'Name is correct' || errors.maxMin !== 'max-min values are correct'}
          />
          
            {errors.name !== 'no data' &&(
              <p >{errors.name}</p>
            )}
            {errors.maxMin !== 'no data' &&(
              <p>{errors.maxMin}</p>
            )}
            {input.temperaments.length >= 7 &&(
              <p>Maximum amount of temperaments reached</p>
            )}


          
        </form>

        <div className={createBreed.selectedTempers}>
          <h2>Selected temperaments</h2>
          {input.temperaments &&
            input.temperaments.map((temper) => (
              <div className={createBreed.temperSelected}>
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
      </div>
    </React.Fragment>
  );
}
