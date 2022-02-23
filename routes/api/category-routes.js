const router = require('express').Router();
const { Category, Product } = require('../../models');


// get request for all categories

router.get('/', (req, res) => {
  // be sure to include its associated Products
  Category.findAll(
    {include: 
      {model: Product,
      attributes: 
        ['product_name', 'price']}
    })
    .then(category => res.json(category))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// get request to find one specific category

router.get('/:id', (req, res) => {
  Category.findOne(
    {where: 
      {id: req.params.id},
      include: 
      {model: Product,
      attributes: 
        ['product_name', 'price']}
    })
    .then(category => res.json(category))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




// post request to add a new category

router.post('/', (req, res) => {
  Category.create(
    {category_name: req.body.category_name}
    )
    .then(category => res.json(category))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// put request to update a category

router.put('/:id', (req, res) => {
  Category.update(
    {category_name: req.body.category_name},
    {where: 
      {id: req.params.id}
    })
    .then(category => res.json(category))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// delete request to delete a category

router.delete('/:id', (req, res) => {
  Category.destroy(
    {where: 
      {id: req.params.id}
    })
    .then(category => {
      if (!category) {
        res.status(404).json({ message: 'No Category found with that ID.' });
        return;}
      res.json(category);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;