// implement your posts router here
const express = require('express')
const posts = require('./posts-model')

const router = express.Router()

router.get('/posts', (req, res) => {
  posts.find()
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({ message: "The posts information could not be retrieved" })
  })
})


module.exports = router