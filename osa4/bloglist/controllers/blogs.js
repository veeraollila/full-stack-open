import { Router } from "express"
const router = Router()
import Blog from '../models/blog.js'

router.get('/', (req, res) => {
    Blog
      .find({})
      .then(blogs => {
        res.json(blogs)
      })
})
  
router.post('/', async (req, res) => {
    const { title, author, url, likes } = req.body
  
    const blog = new Blog({ title, author, url, likes })
  
    const savedBlog = await blog.save()
    res.json(savedBlog)
})

export default router