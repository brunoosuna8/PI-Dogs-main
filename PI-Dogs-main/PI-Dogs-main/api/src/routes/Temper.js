const {Router} = require('express');
const {Dog,Temper}= require('../db')//falta traer el Op,si es q lo uso
const router = Router()
const {getTemperaments} = require('../../functions/dogs_functions')

router.get('/',async (req,res)=>{
    try {
        
    return res.status(201).json(await getTemperaments())
          
        
    } catch (error) {
        res.status(422).json({error: error.message})
    }
})











module.exports = router;