import fs from "fs"
import imagekit from "../config/imagekit.js"
import Blog from "../models/Blog.js"
import Comment from "../models/Comment.js"
import main from "../config/gemini.js"

export const addBlog = async(req, res)=>{
    try {
        const{title, description, subTitle, category, isPublished} = JSON.parse(req.body.blog)
        const imageFile= req.file
       //check if all feilds are correct
       if(!title || !description || !category || !imageFile || isPublished===undefined){
        return res.json({success:false,message:"all feilds are required"})
       }
        const fileBuffer = fs.readFileSync(imageFile.path)

        //upload to imagekit
        const response = await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:"/blogs"
        })

        //optimization of image
        const optimizedImage = imagekit.url({
            path: response.filePath,
            transformation:[
                {quality: 'auto'},//compresion
                {format: 'webp'},//format modern
                {width: '1280'}///sizing
            ]
        })
     const image = optimizedImage
     await Blog.create({title,subTitle, description , category, image, isPublished})
     res.json({success:true, message: "Blog Added Successfully"})
    } catch (error) {
        res.json({success:false,message: error.message})
    }
}

export const getAllBlogs = async(req, res)=>{
    try {
        const blogs = await Blog.find({isPublished:true})
        res.json({success:true, blogs})
    } catch (error) {
        res.json({success:false,message: error.message})
    }
}

export const getBlogById = async(req, res)=>{
    try {
        const {blogId} = req.params
        const blog = await Blog.findById(blogId)
        if(!blog)
        {
            return res.json({success:false, message:"blog not found"})
        }
        res.json({success:true, blog})
    } catch (error) {
        res.json({success:false,message: error.message})
    }
}

export const deleteBlogById = async(req, res)=>{
    try {
        const {id} = req.body
         await Blog.findByIdAndDelete(id)

         //delete all  comemts related to the blog
         await Comment.deleteMany({blog:id})

         
        res.json({success:true,message:"blog deleted successfully"}) 
    } catch (error) {
        res.json({success:false,message: error.message})
    }
}

export const togglePublish = async(req, res)=>{
    try {
        const {id} = req.body
        const blog = await Blog.findById(id)
        blog.isPublished = !blog.isPublished
        await blog.save()
        res.json({success:true,message:"blog publish status toggled successfully"}) 
    } catch (error) {
        res.json({success:false,message: error.message})
    }
}

export const addComment = async(req, res)=>{
    try {
        
        const {blog, name, content} = req.body
        await Comment.create({blog, name, content})
        res.json({success:true, message:"comment added successfully"})
    } catch (error) {
        res.json({success:false,message: error.message})
    }
}

export const getBlogComments = async(req, res)=>{
    try {
        const {blogId} = req.body
        const comments = await Comment.find({blog: blogId, isApproved:true}).sort({createdAt: -1})
        res.json({success:true, comments})
    } catch (error) {
        res.json({success:false,message: error.message})
    }
}

export const generateBlogContent = async(req, res)=>{
    try {
        const {prompt} =req.body
        const content = await main(prompt + 'generate a blog conetent for this topic in a simple text format')
        res.json({success:true, content})
    } catch (error) {
        res.json({success:false,message: error.message})    
    }
}
