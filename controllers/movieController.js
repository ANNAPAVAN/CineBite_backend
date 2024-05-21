const Movie = require("../models/MovieSchema");

const getMovie = async (_req,res) => {
    Movie.find()
  .then((docs)=> { res.json(docs)})
  .catch((err) => res.status(400).json("Error: "
  + err));
}

const postMovie = async (req,res) => {
  const newMovie = new Movie({
    image : req.body.image,
    price: req.body.price,
    theatre: req.body.theatre,
    movie: req.body.movie,
    area: req.body.area,
    showtime: req.body.showtime,
    
  });
  newMovie.save()
    .then((doc) => {
      res.json({ message: 'Movie Posted successfully' });
      console.log(doc)
    })
    .catch((err) => {
      res.json({ message: 'Movie not POsted' });
      console.log(err)})
}

const deleteMovie = async (req,res) => {
    const id = req.params.id;
    try {
      await Movie.findByIdAndDelete(id);
      // console.log("Movie item deleted successfully");
      res.json({ message: 'Movie item deleted successfully' });
    } catch (error) {
      // console.log("Internal Server Error");
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {getMovie, postMovie, deleteMovie}