//queries for shows
const getShows="SELECT * FROM show ORDER BY show_id ASC";
const getShowsById="SELECT * FROM show WHERE show_id=$1";
const checkShowExists="SELECT s FROM show s WHERE s.show_name=$1";
const checkCatExists="SELECT s FROM category s WHERE s.category_id=$1";
const addShows="INSERT INTO show(show_name,show_slug,show_subtitle,show_description,show_type,show_language,show_image,show_author,show_writer,show_narrator,show_podcaster,show_artist,show_access_type,show_rss_slug,show_credits,show_tags,show_category,category_id,show_comingsoon_image,show_update_frequency,show_banner,show_trailer_audio,show_short_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)";
const removeShows="DELETE FROM show WHERE show_id=$1"
const updateShow="UPDATE show SET show_name=$1,show_slug=$2,show_subtitle=$3,show_description=$4,show_type=$5,show_language=$6,show_image=$7,show_author=$8,show_writer=$9,show_narrator=$10,show_podcaster=$11,show_artist=$12,show_access_type=$13,show_rss_slug=$14,show_credits=$15,show_tags=$16,show_category=$17,category_id=$18,show_comingsoon_image=$19,show_update_frequency=$20 WHERE show_id=$21";


//select *, ROW_NUMBER() OVER(ORDER BY SN) No from product
module.exports={
    getShows,
    getShowsById,
    checkShowExists,
    addShows,
    removeShows,
    updateShow,
    checkCatExists,
};