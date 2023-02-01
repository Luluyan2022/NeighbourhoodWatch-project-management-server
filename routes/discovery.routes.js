const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Discovery = require("../models/Discovery.model")
const fileUploader = require("../config/cloudinary.config");


// GET /api/discoveries -  Retrieves all of the discoveries
router.get('/discoveries', (req, res, next) => {
    Discovery.find()
        .populate('author')
        .then(allDiscoveries => res.json(allDiscoveries))
        .catch(err => {
            console.log("error getting allDiscoveries from DB", err);
            res.status(500).json(err)
        });
});

//  POST /api/discoveries  -  Creates a new discovery
router.post('/discoveries', (req, res, next) => {
    const {title, description, imageUrl, author} = req.body;
   
    Discovery.create(req.body)
      .then(response => res.json(response))
      .catch(err => {
        console.log("error creating new discovery", err);
        res.status(500).json(err)
    });
  });

// GET /api/discoveries -  Retrieves a specic discovery
router.get('/discoveries/:discoveryId', (req, res, next) => {
    const {discoveryId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(discoveryId)){
        res.status(400).json({message: 'Specified id is not valid'})
        return;
    }

    Discovery.findById(discoveryId)
         // populate the author in both parts and prevent displaying the password of user
        .populate({path:"author comments.author",select:"-password"})
        .then(discoveryDetails => { 
            res.json(discoveryDetails)})
        .catch(err => {
            console.log("error getting one discoveryDetails from DB", err);
            res.status(500).json(err)
        });
});

// PUT /api/discoveries -  Updates a specic discovery
router.put('/discoveries/edit/:discoveryId', (req, res, next) => {
    const {discoveryId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(discoveryId)){
        res.status(400).json({message: 'Specified id is not valid'})
        return;
    }

    Discovery.findByIdAndUpdate(discoveryId, req.body, { new:true })
        .then(updatedDiscoveryDetails => res.json(updatedDiscoveryDetails))
        .catch(err => {
            console.log("error updating one discoveryDetails from DB", err);
            res.status(500).json(err)
        });
});

// Delete /api/discoveries -  Deletes a specic discovery
router.delete('/discoveries/:discoveryId', (req, res, next) => {
    const {discoveryId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(discoveryId)){
        res.status(400).json({message: 'Specified id is not valid'})
        return;
    }

    Discovery.findByIdAndRemove(discoveryId)
        .then(() => res.json({ message: `discovery with ${discoveryId} is removed successfully.` }))
        .catch(err => {
            console.log("error deleting one discoveryDetails from DB", err);
            res.status(500).json(err)
        });
});

  module.exports = router;