const {Router} = require('express');
const {Dog,Temper}= require('../db')//falta traer el Op,si es q lo uso
const router = Router()

const {getDogs,getDogById,createDog} = require('../../functions/dogs_functions')
router.get('/',async (req,res)=>{
    try {
        const {name}= req.query;
        if(name){
            console.log(name)
            const dogs = await getDogs(name)
            
                return res.status(200).json(dogs)
            
        }else{
            const dogs = await getDogs()
            return res.status(200).json(dogs)
        }
    } catch (error) {
        return res.status(404).send(error.message)
    }
})




router.post('/',async (req,res)=>{
    const{id,name,height,weight,life_span,temperaments} = req.body;
   
    try {
        if(!name || !height || !weight){
            //??? nose si es asi
            res.status(422).json({error: "There are missing values"})
        }
        return res.status(201).json(await createDog(id,name,height,weight,life_span,temperaments))
    } catch (error) {
        res.status(422).json({error: error.message})
    }

})

router.get('/:id',async (req,res)=>{
    try {
        const {id} = req.params
        return res.status(200).json(await getDogById(id))

    } catch (error) {
        return res.status(404).send(error.message)
    }
})



module.exports = router;
