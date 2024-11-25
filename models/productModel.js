const mongoose = require('mongoose')
//For us to have a model , we need to define its schema first: Normal Schema according to what I saw
//Sort of JSON
const productSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required : [true, "Vlidation message: Enter name"]
        },
        quantity:{
            type: Number,
            reuired: true,
            default:0
        },
        price:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:false
        }

    },
    {
        timestamps:true
        //created at and updated at
    }
)
//After the schema comes the model:
const Product = mongoose.model('Product',productSchema);

module.exports = Product; 