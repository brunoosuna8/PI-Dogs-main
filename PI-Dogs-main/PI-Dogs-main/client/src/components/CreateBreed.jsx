import React from 'react';
import * as actions from '../actions/actions.js';
import { useDispatch, useSelector } from "react-redux";
export function validate(input){
    let errors = {};
    
    console.log(input)

    // if(input.max_height < input.min_height) errors.maxMin = `Max height can't be lower than min height`;
    // if(input.max_weight < input.min_weight) errors.maxMin = `Max weight can't be lower than min weight`;
    // if(input.max_life < input.min_life) errors.maxMin = `Max life span can't be lower than min life span`;
    if((input.max_height < input.min_height) || 
    (input.max_weight < input.min_weight) ||
    (input.max_life < input.min_life)
    ){
        errors.maxMin = 'Some value of max-min is incongruent'
        console.log(errors.maxMin)
    }
    if (!input.name) {
        
      errors.name = 'Name of breed is required';
      console.log(errors.name)
    } else if (!/\S+@\S+\.\S+/.test(input.name)) {
      errors.name = 'Username is invalid';
      console.log(errors.name)
    
    }


    
  
    return errors;
  }
export default function CreateBreed(){
    

    let [input,setInput] = React.useState({
        name:"",
        max_height:0,
        min_height:0,
        max_weight:0,
        min_weight:0,
        max_life:0,
        min_life:0,
        temperaments: [],
    })
    const [errors, setErrors] = React.useState({});







    const dispatch = useDispatch();
    

    React.useEffect(()=>{
        dispatch(actions.getTemperaments());
   },[])

   let temperaments = useSelector(state => state.temperaments)


    let handleChange= (e) =>{
        e.preventDefault();
        setInput((prev) => (
            {...prev,[e.target.name]:e.target.value}
            ))

            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
              }));
        
        
    }
    let handleSubmit= (e) =>{
        e.preventDefault();
        //antes de enviar el obj,paso los datos a las props apropiadas.
        //falta life span
        let weight =`${input.min_weight} - ${input.max_weight}`;
        let height = `${input.min_height} - ${input.max_height}`;
        let life_span = `${input.min_life} - ${input.max_life} yeas`;
        

        let obj={
            name: input.name,
            weight,
            height,
            life_span,
            temperaments: input.temperaments
        }
        console.log(obj);
        console.log(errors);
        console.log(Object.keys(errors).length);

        if(Object.keys(errors).length  > 0) {console.log('there is some empty value');return}

        dispatch(actions.createDog(obj))
        

    }

    let handleChangeSelect =(e)=>{
        
        

        if(!input.temperaments.includes(e.target.value)){
            
            setInput((prev) => ({...prev,temperaments:[...input.temperaments,e.target.value]}))
        }
        
    }
    let handleDeleteTemper = (e)=>{
        
        console.log(input.temperaments);
        console.log(e.target.value);

        setInput((prev) => ({...prev,temperaments:input.temperaments.filter(temper => temper !== e.target.value)}))
        console.log(input.temperaments);

    }
    return(
        <React.Fragment>
            <h1>Create Breed</h1>
            <form onSubmit={e=> handleSubmit(e)}>
                <div>
                <label>Name</label>
                <input type={"text"} name={'name'} value = {input.name}
                onChange={(e)=> handleChange(e)}/>
                </div>



                <div>
                <label>Height</label>
                <input name={'min_height'} type={"number"} placeholder='min height'
                value = {input.min_height}
                onChange={(e)=> handleChange(e)} />
                <input name={'max_height'} type={"number"} 
                value = {input.max_height}
                onChange={(e)=> handleChange(e)} />
                </div>
                



                <div>
                <label>Weight</label>
                <input name={'min_weight'} type={"number"} placeholder='min weight'
                value = {input.min_weight}
                onChange={(e)=> handleChange(e)}/>
                <input name={'max_weight'} type={"number"} placeholder='max weight'
                value = {input.max_weight}
                onChange={(e)=> handleChange(e)}/>
                </div>




                <div>
                <label>Life's Span</label>
                {/* van como int pero al guardarse en DB queda como strings "10 - 15 yeas" */}
                <input name={'min_life'} type={"number"}placeholder='min life'
                value = {input.min_life}
                onChange={(e)=> handleChange(e)}/>
                <input name={'max_life'} type={"number"} placeholder='max life'
                value = {input.max_life}
                onChange={(e)=> handleChange(e)}/>

                <label>Temperaments *opcional*</label>
                <select onChange={(e)=> handleChangeSelect(e)} name="temperament" id="temperament" multiple size="10">
                    {temperaments && temperaments.map(temper =>  
                    
                        <option value={temper.name} name="temperaments" key={temper.id} 
                        >{temper.name}</option>
                        
                    )}
                </select>
                </div>
                <input type="submit" value ={'Create Breed'} />
            </form>
            
            <div className='selected-tempers'>
                <h2>selected temperaments</h2>
            {input.temperaments && input.temperaments.map((temper) =>(
                
                <div>
                    
                    <h4 >{temper}</h4>
                    <button className='close' value ={temper} onClick={(e) =>handleDeleteTemper(e)}>X</button>
                </div>
            )) }
            </div>
        </React.Fragment>

    )
}
