import React from 'react';
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

    let handleChange= (e) =>{
        e.preventDefault();
        setInput((prev) => ({...prev,[e.target.value]:e.target.value}))
    }
    let handleSubmit= (e) =>{
        e.preventDefault();
        //falta enviar la info de alguna forma,no deberia ir al estado global porq lo q quiero haces es guardar esta info en la DB,no que otros componentes puedan acceder a ella
    }
    return(
        <React.Fragment>
            <h1>Create Breed</h1>
            <form onClick={e=> handleSubmit(e)}>

                <div>
                <label>Name</label>
                <input type={"text"} name={'name'} value = {input.name}
                onChange={(e)=> handleChange(e)}/>
                </div>



                <div>
                <label>Height</label>
                <input name={'min_height'} type={"number"} placeholder='min height'
                value = {input.name}
                onChange={(e)=> handleChange(e)} />
                <input name={'max_height'} type={"number"} placeholder='max height'
                value = {input.name}
                onChange={(e)=> handleChange(e)} />
                </div>
                



                <div>
                <label>Weight</label>
                <input name={'min_weight'} type={"number"} placeholder='min weight'
                value = {input.name}
                onChange={(e)=> handleChange(e)}/>
                <input name={'max_weight'} type={"number"} placeholder='max weight'
                value = {input.name}
                onChange={(e)=> handleChange(e)}/>
                </div>




                <div>
                <label>Life's Span</label>
                {/* van como int pero al guardarse en DB queda como strings "10 - 15 yeas" */}
                <input name={'min_life'} type={"number"} />
                <input name={'max_life'} type={"number"} />

                <label>Temperaments *opcional*</label>
                
                </div>
                <input type="submit" value ={'Create Breed'} />
            </form>
        </React.Fragment>

    )
}
