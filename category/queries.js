
//queries for episode
const getCat="SELECT * FROM category ORDER BY category_id ASC";
const getCatById="SELECT * FROM category WHERE category_id=$1";
const checkCatExists="SELECT s FROM category s WHERE s.category_name=$1";
const checkShowExists="SELECT s FROM show s WHERE s.show_id=$1";
const addCat="INSERT INTO category(category_name,category_slug,category_description,category_image,category_icon,category_banner,category_color,shorturl) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)";
const updateCat="UPDATE category SET category_name=$1,category_slug=$2,category_description=$3,category_image=$4,category_icon=$5,category_banner=$6,category_color=$7,shorturl=$8 WHERE category_id=$9";
const removeCat="DELETE FROM category WHERE category_id=$1"

//select *, ROW_NUMBER() OVER(ORDER BY SN) No from product
module.exports={
    getCat,
    getCatById,
    checkCatExists,
    addCat,
    updateCat,
    removeCat,
    checkShowExists
};