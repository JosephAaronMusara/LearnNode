const express = require('express');
const mongoose = require('mongoose')//DB
const Product = require("./models/productModel"); //Importing the product model
const app = express();//Creating the app
app.use(express.json());//So that it understands JSON (Middleware)
app.use(express.urlencoded({extended:false})); //Form data middleware

//get all records
app.get('/products', async(req,res) =>{
    try {
        const product = await Product.find({}); //await since we are dealing with DB
        res.status(200).json(product); //Return the data that we created
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : error.message})
    }
})

//get by id
app.get('/products/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id); //await since we are dealing with DB
        res.status(200).json(product); //Return the data that we created
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : error.message})
    }
})

//create
app.post('/products', async(req,res) =>{
    try {
        const product = await Product.create(req.body); //await since we are dealing with DB
        res.status(200).json(product); //Return the data that we fetched
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : error.message})
    }
})

//update

app.put('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message: `cannot find the specified ID`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//delete

app.delete('/products/:id', async(req,res) => {

    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`product not found`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


mongoose.connect('mongodb+srv://josephaaronmusara:31GMKk6hUuvW1xXL@learnnodeapi.kep7q.mongodb.net/Node-API?retryWrites=true&w=majority&appName=LearnNodeAPI')
.then(()=>{
    app.listen(3000, () =>{
        console.log(`Node API is running on port 3000`)
    })
    console.log('Connected successfully')
}).catch((error)=>{
    console.log(error)
})