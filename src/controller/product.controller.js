const multer = require('multer');  //upload image
const fs = require('fs'); // manage files (del photo)
const { v4: uuidv4 } = require('uuid');  //to generate uniqe name 

const handlerAsync = require('../middleware/handlerAsync');
const productModel = require('../model/product.model');

// to specify place to save photo
const multerStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/product')
    },
    filename:(req,file,cb) => {
        const ext = file.mimetype.split('/')[1];  //jpg or png
        cb(null,`products_${uuidv4()}_${Date.now()}_.${ext}`)
    }
})
 //filter to accept only image
const multerFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new Error("Must Be Upload type of Image"),false)
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
})


exports.uploadMutipleImage = upload.array('images');
// Get all products 
exports.getAllProduct = handlerAsync(async (req,res,next)=>{
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;

    const countDocument = await productModel.countDocuments();
    const allPages = Math.ceil(countDocument / limit);

    const skip = (page - 1) * limit;

    const products = await productModel.find().skip(skip).limit(limit);

    res.json({
        data:{
            allPages,
            page:page*1,
            products
        }
    })
});
   //get product by id 
exports.getProductById = handlerAsync(async (req,res,next)=>{
    const product = await productModel.find({
        _id:req.params.id
    })
    res.json({
        product
    })
});
   //get Products By CategoryId
exports.getProductsByCategoryId = handlerAsync(async (req,res,next)=>{
    console.log(req.params)
    const products = await productModel.find({
        category:req.params.catId
    })
    res.json({
        products
    })
});


//add product
exports.addProduct = handlerAsync(async (req,res,next)=>{
    let arrImages = [];
    req.files.forEach(element => {
        arrImages.push(element.filename)
    });
    const product = await productModel.create({
        name: req.body.name,
        priceBeforeDiscount: req.body.priceBeforeDiscount,
        images : arrImages,
        category : req.body.category
    })

    res.status(201).json({
        message: "product Created",
        product
    })
})
  //update product
exports.updateProduct = handlerAsync(async (req,res,next)=>{
    const product = await productModel.findById(req.params.id);
    let productUpdate;
    if(req.files.length > 0){
        product.images.forEach(element => {
            if(fs.existsSync(`uploads/product/${element}`)){
                fs.unlinkSync(`uploads/product/${element}`)
            }
        });
        let arrImages = [];
        req.files.forEach(element => {
            arrImages.push(element.filename)
        });
        productUpdate =  await productModel.findByIdAndUpdate(product._id,{
            name:req.body.name,
            images:arrImages,
            category:req.body.category || product.category,
            stock:req.body.stock || product.stock
        },{runValidators: true,new:true})
    }else{
        productUpdate = await productModel.findByIdAndUpdate(product._id,{
            name:req.body.name,
            category:req.body.category || product.category,
            stock:req.body.stock || product.stock,
        },{runValidators: true,new:true})
    }

    res.status(202).json({
        message:"Product Updated",
        productUpdate
    });
})
   //delete product
exports.deleteProduct = handlerAsync(async(req,res,next)=>{
    const product = await productModel.findByIdAndDelete(req.params.id)
    product.images.forEach((element)=>{
        fs.unlinkSync(`uploads/product/${element}`)
    })
    res.status(204).json({})
})

