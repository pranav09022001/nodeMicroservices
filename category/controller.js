const pool = require("./db")
const queries = require('./queries')
const slugify = require('slugify');

//modules for Episodes

//gives all episodes
const getCat = (req, res) => {
  pool.query(queries.getCat, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  })
}

//it gives  episode by ID
const getCatById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getCatById, [id], (error, results) => {
    if (!results.rows.length) {
      res.send("Category not found")
    }
    else {
      res.status(200).json(results.rows)
    }
  })
}

/*
const usedNumbers = []; // Array to store used random numbers

const generateUniqueRandomNumber = () => {
  const randomNum = Math.floor(Math.random() * 1000);

  if (usedNumbers.includes(randomNum)) {
    // If the random number is already used, generate a new one recursively
    return generateUniqueRandomNumber();
  }

  usedNumbers.push(randomNum); // Add the new random number to the usedNumbers array
  return randomNum;
};
*/


//add new episode
const addCat = (req, res) => {
  const {
    category_name,category_description, category_color,
  } = req.body;

  if (!req.files || !req.files['category_image'] || !req.files['category_icon'] || !req.files['category_banner']) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

    // Generate the slug based on the category_name
    //const randomNum = generateUniqueRandomNumber();
    const slugname=category_name.split(' ').join('-');
    const category_slug = `${slugify(slugname, { lower: true })}`;

    //generate Shorturl automatically
    const firstWord = category_name.split(' ')[0];
    const shorturl=`${slugify(firstWord,{lower:true})}`;

  // Access the uploaded files from the request object
  const category_image = req.files['category_image'][0].filename;
  const category_icon = req.files['category_icon'][0].filename;
  const category_banner = req.files['category_icon'][0].filename;


  pool.query(queries.addCat, [category_name, category_slug, category_description, category_image, category_icon, category_banner, category_color,shorturl],
    (error, results) => {
      if (error) {
        console.error(error); // Log the specific error
        return res.status(500).send("An unexpected error occurred");
      }

      res.status(200).send("Category created successfully");
    }
  );
};

//updates he existing category.
const updateCat = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    category_name, category_slug, category_description, category_image, category_icon, category_banner, category_color
  } = req.body;

  pool.query(queries.getCatById, [id], (error, results) => {
    const noEpiFound = !results.rows.length;
    if (noEpiFound) {
      res.status(400).send("Category does not exist");
    } else {
      pool.query(queries.updateCat,
        [category_name, category_slug, category_description, category_image, category_icon, category_banner, category_color, id],
        (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).send("error occurred..")
          }
          else {
            res.status(200).send("category updated successfully")
          }

        }
      );
    }
  });
};


//delete episode
const removeCat = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getCatById, [id], (error, results) => {
    const noEpiFound = !results.rows.length;
    if (noEpiFound) {
      res.send("Category does not exist");
    }

    pool.query(queries.removeCat, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Category removed successfully")
    })
  })
}


//exports all the modules
module.exports = {
  getCat,
  getCatById,
  addCat,
  updateCat,
  removeCat,
};