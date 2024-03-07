
//queries for episode
const getEpi="SELECT * FROM episode ORDER BY episode_id ASC";
const getEpiById="SELECT * FROM episode WHERE episode_id=$1";
const checkEpiExists="SELECT s FROM episode s WHERE s.episode_name=$1";
const checkShowExists="SELECT s FROM show s WHERE s.show_id=$1";
const addEpi="INSERT INTO episode(episode_name,episode_slug,episode_description,episode_type,episode_image,episode_audio,episode_author,episode_writer,episode_narrator,episode_podcaster,episode_artist,episode_access_type,show_id,episode_short_url,meta_title,meta_description,is_dolby_atmos,android_dolby_audio,ios_dolby_audio) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)";
const updateEpi="UPDATE episode SET episode_name=$1,episode_slug=$2,episode_description=$3,episode_type=$4,episode_image=$5,episode_audio=$6,episode_author=$7,episode_writer=$8,episode_narrator=$9,episode_podcaster=$10,episode_artist=$11,episode_access_type=$12,show_id=$13 WHERE episode_id=$14"
const removeEpi="DELETE FROM episode WHERE episode_id=$1"

//select *, ROW_NUMBER() OVER(ORDER BY SN) No from product
module.exports={
    getEpi,
    getEpiById,
    addEpi,
    checkEpiExists,
    removeEpi,
    updateEpi,
    removeEpi,
    checkShowExists
};