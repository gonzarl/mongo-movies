const express = require('express')
const { insertItem,  getPelis, getPelisBusquedaEspecifica, getPelisRandom } = require('./db')
const Ajv = require("ajv")
const ajv = new Ajv()

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

router.get('/pelis-random', (req,res) => {
  getPelisRandom()
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
  const valid = ajv.validate(schemaMovie,item)
  if (!valid) {
    console.log(ajv.errors)
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

const schemaMovie = {
  type: "object",
  properties: {
    title: {type: "string"},
    fullplot: {type: "string"},
    cast: {type: "array"},
    poster: {type: "string"},
    year: {type: "integer"},
  },
  required: ["title", "year"]
}

module.exports = router
