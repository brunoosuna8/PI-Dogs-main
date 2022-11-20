const axios = require('axios');

const {Router} = require('express');
const {Dog,Temper,Op}= require('../src/db')//falta traer el Op,si es q lo uso
async function  getDogs(race){

    //Falta que retorne raza encontrada parecida,o sin una palabra
    const dogsApi = await axios('https://api.thedogapi.com/v1/breeds')
    .then(res => res.data)
    const dogsDB = await Dog.findAll({include: Temper});
    
    
    let allDogs =[];
    if (!dogsApi && !dogsDB){
        throw new Error('no api founded');
   }else{
     allDogs = [...dogsApi,...dogsDB];
   }
    
        let filterDogs= [];
        
    if(race){

        allDogs.forEach(e=> {

            let weightMetric,temperaments,heightMetric;
            if(e.weight.metric){
                weightMetric = e.weight.metric
                temperaments= e.temperament
                heightMetric = e.height.metric
            }else{
                weightMetric = e.weight;
                heightMetric = e.height;

                let temperArr = e.tempers.map( e => e.name.charAt(0).toUpperCase()+e.name.slice(1))
                
                temperaments = temperArr.join();
            }


            if (e.name === race) filterDogs.push({
                
                name: e.name,image: e.image,
                temperament:temperaments,
                weight: weightMetric,
                height: weightMetric,
                life_span : e.life_span,
                id: e.id
            });

        });//capas le falta algo

        

        if(filterDogs.length < 1){
            throw new Error('no dogs founded');//si no se encuentra devuelve array 
        }else{
            return filterDogs;
        }
    }else{
        
        
        filterDogs = allDogs.map(e=>{
            let weightMetric,temperaments,image;
        
            if(e.weight.metric){
                weightMetric = e.weight.metric
                temperaments= e.temperament
                image = e.image.url
            }else{
                weightMetric = e.weight
                let temperArr = e.tempers.map(  e => e.name.charAt(0).toUpperCase()+e.name.slice(1))
                image = e.image;
                temperaments = temperArr.join();
            }
            return{name: e.name,image: e.image,temperament:temperaments,weight: weightMetric,id: e.id}
        })
        return filterDogs;
    }
    }

    


    async function getDogById(id){
        //falta traer temperamentos
    const dogsApi = await axios('https://api.thedogapi.com/v1/breeds')
    .then(res => res.data)
    const dogsDB = await Dog.findAll({include: Temper});
    let allDogs =[];
    if (!dogsApi && !dogsDB){
        throw new Error('no api founded');
   }else{
     allDogs = [...dogsApi,...dogsDB];
   }

   

   let index = allDogs.findIndex(e=> e.id == id);
   if(index !== -1){
    let obj;
    
    if(!allDogs[index].weight.metric){
        let temperaments;
        let temperArr = allDogs[index].tempers.map(  e => e.name.charAt(0).toUpperCase()+e.name.slice(1))
                
        temperaments = temperArr.join();
        let obj = {
            name: allDogs[index].name,
            image: 'https://previews.123rf.com/images/cundrawan703/cundrawan7031207/cundrawan703120700008/14519717-perro-avatar-dibujos-animados-icono-de-car%C3%A1cter.jpg',
            temperament: temperaments,
            weight: allDogs[index].weight,
            height: allDogs[index].height,
            life_span : allDogs[index].life_span

        }
    return obj      

    }else{
        obj = {
            name: allDogs[index].name,
            image: allDogs[index].image.url ? allDogs[index].image.url : "dog hasn't image",
            temperament:allDogs[index].temperament,
            weight: allDogs[index].weight.metric,
            height: allDogs[index].height.metric,
            life_span : allDogs[index].life_span
            }
    }
    
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