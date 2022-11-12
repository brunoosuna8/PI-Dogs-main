const axios = require('axios');

const {Router} = require('express');
const {Dog,Temper,Op}= require('../src/db')//falta traer el Op,si es q lo uso
async function  getDogs(race){
    //Falta que retorne raza encontrada parecida,o sin una palabra
    const dogsApi = await axios('https://api.thedogapi.com/v1/breeds')
    .then(res => res.data)
    const dogsDB = await Dog.findAll();//falta incluir temperamento
    let allDogs =[];
    if (!dogsApi && !dogsDB){
        throw new Error('no api founded');
   }else{
     allDogs = [...dogsApi,...dogsDB];
   }
    
        let filterDogs= [];
        console.log(race)
    if(race){

        allDogs.forEach(e=> {
            if (e.name === race) filterDogs.push({
                name: e.name,image: e.image,
                temperament:e.temperament,
                weight: e.weight,
                height: e.height,
                life_span : e.life_span
            });

        });//capas le falta algo

        
        if(filterDogs.length < 1){
            throw new Error('no dogs founded');//si no se encuentra devuelve array 
        }else{
            return filterDogs;
        }
    }else{
        filterDogs = allDogs.map(e=>{
            return{name: e.name,image: e.image,temperament:e.temperament,weight: e.weight}
        })
        return filterDogs;
    }
    }




    async function getDogById(id){
        //falta traer temperamentos
        const dogsApi = await axios('https://api.thedogapi.com/v1/breeds')
    .then(res => res.data)
    const dogsDB = await Dog.findAll();
    let allDogs =[];
    if (!dogsApi && !dogsDB){
        throw new Error('no api founded');
   }else{
     allDogs = [...dogsApi,...dogsDB];
   }
   let index = allDogs.findIndex(e=> e.id == id);
   if(index !== -1){
    console.log(allDogs[index])
    let obj = {
                name: allDogs[index].name,
                image: allDogs[index].image,
                temperament:allDogs[index].temperament,
                weight: allDogs[index].weight,
                height: allDogs[index].height,
                life_span : allDogs[index].life_span
                }
                console.log(obj)
                return obj
     }else{
        throw new Error(`no dog by id : ${id} founded` )
     }

    }
   

    async function createDog(id,name,height,weight,life_span,temperaments){
        //life span puede ser undefined ,nose si falta algo de eso
        let newDog = await Dog.create(
            {
            id,name,height,weight,life_span
        })
        //buscar los tempers en la DB
        //buscar los ids de los tempers que se van a agregar
        let tempersInObj,tempersIDs;
        if(temperaments){
            tempersInObj=  temperaments.map(e=>{
            return {
                name : e.toLowerCase()
            }
        })
        const tempers = await Temper.findAll({
            where:{
                [Op.or]:tempersInObj
            }
        })
         
        tempersIDs = tempers.map(e=> e.id)

        await newDog.addTempers(tempersIDs)
        }
        return newDog;
    }
    
    async function  getTemperaments(){
        const dogsApi = await axios('https://api.thedogapi.com/v1/breeds')
        .then(res => res.data)
        const dogsDB = await Dog.findAll();//falta incluir temperamento
        let allDogs =[];
        if (!dogsApi && !dogsDB){
            throw new Error('no api founded');
       }else{
         allDogs = [...dogsApi,...dogsDB];
       }
       
       let arrTemps=[];
      
       allDogs.forEach(e=>
        {
            if(e.temperament){
                let arr = e.temperament.split(',')
                arrTemps = [...arrTemps,...arr]
            }
            
       })
      
       let  fixed = arrTemps.map(e=>{
        let string;
        if(e[0] === ' ') { 
            string= e.slice(1);
            
            return string.toLowerCase()
        }
        return e.toLowerCase()

        })
        
        let filtered = fixed.filter((item,index)=>{
            return fixed.indexOf(item) === index;
          })

        let arrObj = filtered.map(e=> {return{name:e}})

       
       
       const tempersDB = await Temper.bulkCreate(arrObj)
       return tempersDB;
        }




        
    module.exports = {getDogs,getDogById,createDog,getTemperaments};