// implement your posts router here
const express = require('express')
const posts = require('./posts-model')

const router = express.Router()

//endpoint to get all posts
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

//endpoint to get a post by id
router.get('/posts/:id', (req, res) => {
  posts.findById(req.params.id)
  .then((post) => {
    if (post) {
      res.status(200).json(post)
    } else {
    res.status(404).json({ message: "The post with the specified ID does not exist" })
  }})
  .catch((err) => {
    console.log(err)
    res.status(500).json({ message: "The post could not be retrieved" })
  })
})

//endpoint to create a post
router.post('/posts', (req, res) => {
  if(!req.body.title || !req.body.contents) {
    return res.status(400).json({ message: "Please provide title and contents for the post" })
  }

  posts.insert(req.body)
  .then((post) => {
    res.status(201).json(post)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({ message: "There was an error while saving the post to the database" })
  })
})

//endpoint to edit a post
router.put('/posts/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(404).json({ message: "The post with the specified ID does not exist" })
  }

  if(!req.body.title || !req.body.contents) {
    return res.status(400).json({ message: "Please provide title and contents for the post" })
  }

  posts.update(req.params.id, req.body)
  .then((post) => {
    console.log(post)
    res.status(200).json(post)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({ message: "The post information could not be modified" })
  })
})

//endpoint to delete a post
router.delete('/posts/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(404).json({ message: "The post with the specified ID does not exist" })
  }

  posts.remove(req.params.id)
  .then ((post) => {
    res.status(200).json({message: "Post removed"})
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({ message: "The post could not be removed" })
  })
})


module.exports = router