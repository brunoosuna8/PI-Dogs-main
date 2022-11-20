import React from "react";
import s from '../styles/pages.module.css'

const Paginado = ({dogsPerPage,dogs,paginado}) =>{


   
    

    const pageNumbers = [];

    for(let i = 1; i<= Math.ceil(dogs/dogsPerPage);i++){
        pageNumbers.push(i)
    }

    return(
        
            <ul className={s.paginado}>
                {pageNumbers && pageNumbers.map(e =>
                {
                    return(<li className="number" key={e}> 
                    <a onClick={()=> paginado(e)}>{e}</a>

                    </li>)
                })}
            </ul>
        
    )




};

export default Paginado;
