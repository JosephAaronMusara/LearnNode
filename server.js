const express = require('express');
const mongoose = require('mongoose')//DB
const Product = require("./models/productModel"); //Importing the product model
const app = express();//Creating the app
app.use(express.json())//So that it understands JSON (Middleware)

app.get('/', (req,res) => {
    res.send('Hello Node API')
})

app.post('/product', async(req,res) =>{
    try {
        const product = await Product.create(req.body); //await since we are dealing with DB
        res.status(200).json(product); //Return the data that we created
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : error.message})
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