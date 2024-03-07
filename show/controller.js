const pool = require("./db")
const queries = require('./queries')
const slugify = require('slugify');
//Modules for show

//it gives all shows
const getShows = (req, res) => {
    pool.query(queries.getShows, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

//it gives show by id
const getShowsById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getShowsById, [id], (error, results) => {
        if (!results.rows.length) {
            res.send("show not found")
        }
        else {
            res.status(200).json(results.rows)
        }
    })
}


//Generate unique number for slug
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

//add new show
const addShows = (req, res) => {

    const { show_name, show_subtitle, show_description, show_type, show_language, show_author, show_writer, show_narrator, show_podcaster, show_artist, show_access_type, show_rss_slug, show_credits, show_tags, show_category, category_id, show_comingsoon_image, show_update_frequency, show_banner, show_trailer_audio, show_short_url } = req.body;
    //Check Category is available
    if (!category_id) {
        return res.status(400).send("Category id is required");
    }
    //check file is uploaded or not
    if (!req.files || !req.files['show_image']) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    //Access the uploaded files from the request object
    const show_image = req.files['show_image'][0].filename;


    // Generate the slug based on the show_name.
    //const randomNum = generateUniqueRandomNumber();
    const slugname = show_name.split(' ').join('-');
    const show_slug = `${slugify(slugname, { lower: true })}`;

    pool.query(queries.checkCatExists, [category_id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send("An unexpected error occurred");
        }

        if (!results.rows.length) {
            return res.status(200).send("Category not found");
        }


        pool.query(queries.checkShowExists, [show_name], (error, results) => {

            if (error) {
                console.error(error); // Log the specific error
                return res.status(500).send("An unexpected error occurred");
            }
            //check show already exist
            if (results.rows.length) {
                return res.status(400).send("Show already exist");
            }

            pool.query(queries.addShows, [show_name, show_slug, show_subtitle, show_description, show_type, show_language, show_image, show_author, show_writer, show_narrator, show_podcaster, show_artist, show_access_type, show_rss_slug, show_credits, show_tags, show_category, category_id, show_comingsoon_image, show_update_frequency, show_banner, show_trailer_audio, show_short_url], (error, results) => {
                if (error) throw error
                res.status(200).send("Show Created Successfully");
            })
            //add new show to db
        })
    })
}



//removes show
const removeShows = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getShowsById, [id], (error, results) => {
        const noShowFound = !results.rows.length;
        if (noShowFound) {
            res.send("Show does not exist");
        }

        pool.query(queries.removeShows, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Show removed successfully")
        })
    })
}

//update existing show
const updateShow = (req, res) => {
    const id = parseInt(req.params.id);
    const { show_name, show_slug, show_subtitle, show_description, show_type, show_language, show_image, show_author, show_writer, show_narrator, show_podcaster, show_artist, show_access_type, show_rss_slug, show_credits, show_tags, show_category, category_id, show_comingsoon_image, show_update_frequency } = req.body;

    pool.query(queries.getShowsById, [id], (error, results) => {
        const noShowFound = !results.rows.length;
        if (noShowFound) {
            res.send("Show Does not exist")
        }
        
        pool.query(queries.updateShow, [show_name, show_slug, show_subtitle, show_description, show_type, show_language, show_image, show_author, show_writer, show_narrator, show_podcaster, show_artist, show_access_type, show_rss_slug, show_credits, show_tags, show_category, category_id, show_comingsoon_image, show_update_frequency, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("show updated successfully")
        })
    })
}








//exports all the modules
module.exports = {
    getShows,
    getShowsById,
    addShows,
    removeShows,
    updateShow,
};