const express = require('express')
const { insertItem,  getPelis, getPelisBusquedaEspecifica } = require('./db')

const router = express.Router()

router.get('/public',(req,res) => {
  res.sendFile(__dirname + "/public");
})

// Obtener las peliculas solicitadas
router.get('/peliculas', (req, res) => {
  getPelis(req.query.title)
    .then((items) => {
      items = items.map((item) => ({
        title: item.title,
        year: item.year,
        poster: item.poster || null,
        imdb: item.imdb|| null,
        tomatoes: tomatoesRating(item),
        metacritic: item.metacritic || null
      }))
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

const tomatoesRating = (item) => item.tomatoes === undefined ? null :
item.tomatoes.critic === undefined || item.tomatoes.critic.rating === undefined ? null : item.tomatoes.critic.rating

router.get('/peliculas-filtradas', (req, res) => {
  getPelisBusquedaEspecifica()
  .then((items) => {
    items = items.map((item) => ({
      title: item.title,
      year: item.year,
      poster: item.poster || null,
      imdb: item.imdb|| null,
      tomatoes: tomatoesRating(item),
      metacritic: item.metacritic || null
    }))
    res.json(items)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).end()
  })
})

// Postear una pelicula
router.post('/peliculas', (req, res) => {
  const item = req.body
  const result = itemSchema.validate(item)
  if (result.error) {
    console.log(result.error)
    res.status(400).end()
    return
  }
  insertItem(item)
    .then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})


module.exports = router
