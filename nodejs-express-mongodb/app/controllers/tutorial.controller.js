const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // validate request
  if( !req.body.title ){
    res.status(400).send({message: "content cannot be empty"});
    return;
  }

 
  // create a tutorial
  const tutorial = new Tutorial({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
  });

  // save tutorial in the database
  tutorial.save(tutorial)
  .then(data => {
      res.send(data)
  })
  .catch(err => {
      res.status(500).send({message: err.message || 'some error occurred while creating the error'})
  });

};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: {$regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
  .then(data => {
      res.send(data)
  })
  .catch(err => {
      res.status(500).send({message: err.message || "some error occurred while retrieving tutorials"})
  })

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
  .then(data => {
      if(!data){
        res.status(404).send({message: "Not found a tutorial with id "+ id})
      } else {
          res.send(data)
      }
  }).catch(err => {
      res.status(500).send({message: "Error retrieving tutorial with id "+ id});
  })

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

    if(!req.body){
        return res.status(400).send({message: "data to update tutorial can not be empty"});
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then( data => {
        if(!data) {
            res.status(404).send({message: "cannot update tutorial with id= ${id}. Maybe tutorial was not found"})
        } else {
            res.status(200).send({message: "Tutorial was updated successfully"})
        }
    })
    .catch(err => {
        res.status(500).send({message: "Error updating tutorial with id "+ id})
    })
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id, {useFindAndModify: false})
    .then(data => {
        
        if(!data) {
            res.status(404).send({message: `Cannot delete a tutorial with id = ${id}. Maybe tutorial was not found`})
        } else {
            res.status(200).send({message: "Tutorial was deleted successfully"})
        }
    })
    .catch(err => {
        res.status(500).send({message: "could not delete Tutorial with id="+ id});
    })
};



// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
    Tutorial.deleteMany({})
    .then( data => {
        res.send({message: `${data.deletedCount} Tutorials were deleted successfully!`})
    } )
    .catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while removing all tutorials"})
    })

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
    Tutorial.find({published: true})
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).send({message: err.message || "some error occurred while retrieving tutorials"})
    })

};