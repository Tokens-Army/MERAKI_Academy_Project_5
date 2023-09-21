const {pool} =require("../models/db")

// Here is the function that the admin can add the accessories from:
const createNewAccessories = (req,res)=>{
    const {product,description,img,price}=req.body
    const array= [product,description,img,price]
    const query = `INSERT INTO accessories (product,description,img,price) VALUES ($1,$2,$3,$4) RETURNING *`
    pool.query(query,array)
    .then((results)=>{
        res.status(201).json({
            success:true,
            message:"Accessory added successfully",
            result:results.rows
        })
    })
    .catch((err)=>{
        res.status(500).json({
            success:false,
            message:"Server error kindly try again",
            error:err
        })
    })
}

module.exports={createNewAccessories}



















