const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const SecondHandGoods = require("../models/SecondHandGoods.model");
const fileUploader = require("../config/cloudinary.config");

// GET /api/secondHandGoods -  Retrieves all of the secondHandGoods
router.get('/secondHandGoods', (req, res, next) => {
    SecondHandGoods.find()
        .populate('author')
        .then(allSecondHandGoods => res.json(allSecondHandGoods))
        .catch(err => {
            console.log("error getting allSecondHandGoods from DB", err);
            res.status(500).json(err)
        });
});

// for uploading files
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
       
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }  
    res.json({ fileUrl: req.file.path });
  });

//  POST /api/secondHandGoods  -  Creates a new secondHandGood
router.post('/secondHandGoods', fileUploader.single("imageUrl"), (req, res, next) => {
    const {name, price, variety, description, imageUrl, contact, author} = req.body;
    
    SecondHandGoods.create(req.body)
      .then(response => res.json(response))
      .catch(err => {
        console.log("error creating new secondHandGood", err);
        res.status(500).json(err)
    });
  });

// GET /api/secondHandGoods-random -  Retrieves the random secondHandGoods
router.get('/secondHandGoods/random', (req, res, next) => {
    SecondHandGoods.find({$limit : 10})
        .populate('author')
        .then(randomSecondHandGoods => res.json(randomSecondHandGoods))
        .catch(err => {
            console.log("error getting randomSecondHandGoods from DB", err);
            res.status(500).json(err)
        });
});

//  GET /api/secondHandGoods/:secondHandGoodId -  Retrieves a specific secondHandGood by id
router.get('/secondHandGoods/:secondHandGoodId', (req, res, next) => {
    const { secondHandGoodId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(secondHandGoodId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    
    SecondHandGoods.findById(secondHandGoodId)
        .populate({path:"author messages.author",select:"-password"})
        .then(secondHandGoodDetails => res.status(200).json(secondHandGoodDetails))
        .catch(err => {
            console.log("error getting one secondHandGoodDetails", err);
            res.status(500).json(err)
        });
});

// PUT  /api/secondHandGoods/:secondHandGoodId  -  Updates a specific secondHandGood by id
router.put('/secondHandGoods/edit/:secondHandGoodId', (req, res, next) => {
    const { secondHandGoodId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(secondHandGoodId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    
    SecondHandGoods.findByIdAndUpdate(secondHandGoodId, req.body, { new:true })        
        .then(updatedSecondHandGoodDetails => res.status(200).json(updatedSecondHandGoodDetails))
        .catch(err => {
            console.log("error updating one secondHandGoodDetails", err);
            res.status(500).json(err)
        });
});   

// DELETE  /api/secondHandGoods/:secondHandGoodId  -  Deletes a specific secondHandGood by id
router.delete('/secondHandGoods/:secondHandGoodId', (req, res, next) => {
    const { secondHandGoodId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(secondHandGoodId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    
    SecondHandGoods.findByIdAndRemove(secondHandGoodId)        
        .then(() => res.json({ message: `secondHandGood with ${secondHandGoodId} is removed successfully.` }))
        .catch(err => {
            console.log("error deleting one secondHandGoodDetails", err);
            res.status(500).json(err)
        });
});   
  module.exports = router;