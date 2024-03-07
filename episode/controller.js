const pool = require("./db")
const queries = require('./queries')
const slugify = require('slugify');

//modules for Episodes

//gives all episodes
const getEpi = (req, res) => {
  pool.query(queries.getEpi, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  })
}

//it gives  episode by ID
const getEpiById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getEpiById, [id], (error, results) => {
    if (!results.rows.length) {
      res.send("Episode not found")
    }
    else {
      res.status(200).json(results.rows)
    }
  })
}


//Generate unique number for slug

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


//add new episode
const addEpi = (req, res) => {
  const { episode_name, episode_description, episode_type, episode_author, episode_writer, episode_narrator, episode_podcaster, episode_artist, episode_access_type, show_id,episode_short_url,meta_title,meta_description,is_dolby_atmos,android_dolby_audio,ios_dolby_audio
  } = req.body;


  //check show id id available or not
  if (!show_id) {
    return res.status(400).send("show_id is required");
  }



  if (!req.files || !req.files['episode_image'] || !req.files['episode_audio']) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Access the uploaded files from the request object
  const episode_image = req.files['episode_image'][0].filename;
  const episode_audio = req.files['episode_audio'][0].filename;

  // Generate the slug based on the episode_name
  const randomNum = generateUniqueRandomNumber();
  const slugname=episode_name.split(' ').join('-');
  const episode_slug = `${slugify(slugname, { lower: true })}`;


  pool.query(queries.checkShowExists, [show_id], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("An unexpected error occurred");
    }

    if (!results.rows.length) {
      return res.status(200).send("Show not found");
    }
    pool.query(queries.checkEpiExists, [episode_name], (error, results) => {
      if (error) {
        console.error(error); // Log the specific error
        return res.status(500).send("An unexpected error occurred");
      }

      if (results.rows.length) {
        return res.status(400).send("Episode already exists");
      }
      pool.query(queries.addEpi, [episode_name, episode_slug, episode_description, episode_type, episode_image, episode_audio, episode_author, episode_writer, episode_narrator, episode_podcaster, episode_artist, episode_access_type, show_id,episode_short_url,meta_title,meta_description,is_dolby_atmos,android_dolby_audio,ios_dolby_audio
      ],
        (error, results) => {
          if (error) {
            console.error(error); // Log the specific error
            return res.status(500).send("An unexpected error occurred");
          }
          res.status(200).send("Episode created successfully");
        }
      );
    })
  });
};

//updates existing episode
const updateEpi = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    episode_name,
    episode_slug,
    episode_description,
    episode_type,
    episode_image,
    episode_audio,
    episode_author,
    episode_writer,
    episode_narrator,
    episode_podcaster,
    episode_artist,
    episode_access_type,
    show_id
  } = req.body;

  pool.query(queries.getEpiById, [id], (error, results) => {
    const noEpiFound = !results.rows.length;
    if (noEpiFound) {
      res.status(400).send("Episode does not exist");
    } else {
      pool.query(
        queries.updateEpi,
        [
          episode_name,
          episode_slug,
          episode_description,
          episode_type,
          episode_image,
          episode_audio,
          episode_author,
          episode_writer,
          episode_narrator,
          episode_podcaster,
          episode_artist,
          episode_access_type,
          show_id,
          id
        ],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("Episode updated successfully");
        }
      );
    }
  });
};

//delete episode
const removeEpi = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getEpiById, [id], (error, results) => {
    const noEpiFound = !results.rows.length;
    if (noEpiFound) {
      res.send("Episode does not exist");
    }

    pool.query(queries.removeEpi, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Episode removed successfully")
    })
  })
}


//exports all the modules
module.exports = {
  getEpi,
  getEpiById,
  addEpi,
  updateEpi,
  removeEpi,
};