import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try{
    const posts = await Post.find()
    res.status(200).json({"status":"success", "message":"all posts", "data":posts })

  } catch (e) {
    console.log(e)
    res.status(204).json({ "status":"success", "message":"no post found"})
  }
}
export const createNewPost = async (req, res) => {
  try {
    const result = await Post.create({
      title: req.body.title,
      subTitle: req.body.subTitle,
      postBody: req.body.postBody,
      imageUrl : req.body.imageUrl,
    })
    res.status(201).json({"status":"success", "message": "post created","data":{"post":result}})
  } catch (error) {
    console.error(error)
    res.status(500).json({"status":"fail", "error":"internal server error"})
  }
}
export const getPost = async (req,res) => {
  try{
    const { id } = req.params
    const post = await Post.findOne({_id: id})

    if(!post) return res.status(404).json({"status":"failed", "message":"post not found"})

    res.status(200).json({"status":"success", "message":"post found", "data": post })
  }catch (e) {
    console.log(e)
    res.status(404).json({ "status":"fail", "error":`post ${id} not found` })
  }
}
export const updatePost = async (req, res) => {
  try{
    const { id } = req.params
    const post = await Post.findOne({_id: id})

    post.title = req.body.title;
    post.subTitle = req.body.subTitle;
    post.postBody = req.body.postBody;
    post.imageUrl = req.body.imageUrl;

    const result = await post.save()
    res.status(200).json({"status":"success","message": "post updated", "data": result });
  }catch (e) {
    console.log(e)
    res.status(400).json({ "status":"fail", "error":`post not found` });
  }
}

export const deletePost = async (req, res) => {
  try{
    const { id } = req.params
    const post = await Post.findByIdAndDelete({_id: id})

    if(!post) return res.status(404).json({"status":"failed", "message":"post not found"})
    res.status(200).json({"status":"success", "message":"post deleted" })
  }catch (e) {
    console.log(e)
    res.status(400).json({ "status":"fail", "error":`post not found` })
  }
}
