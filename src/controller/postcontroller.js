const postmodel = require("../model/postmodel");
const commentModel = require("../model/commentmodal");
 


const createpost = async (req,res) => {
    try {
        let data = req.body;
        let {title,content,author}= data;
        let postcreate = await postmodel.create(data)
       return res.status(200).send({status:true, data:postcreate});
    } catch (error) {   
        res.status(500).json({message: error.message});
    }
}

const getpost = async (req,res) => {
    try {
        let post = await postmodel.find();
        res.status(200).send({status:true, data:post});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getPostByParams = async (req,res) => {
    try {
        let userId = req.params.userId;
        let post = await postmodel.findOne({author :userId}).lean();
        let comments = await commentModel.find({post:post._id}).select({text:1,user:1,date:1,_id:0,})
        post.comments = comments
        res.status(200).send({status:true, data:post});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



const updatepost = async (req,res) => {
    try {
        let data = req.body;
        let {title,content}= data;
        let post = postmodel.update(data);
        res.status(200).send({status:true, data:post});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deletepost = async (req,res) => { 
    
    try {
        let data = req.body;
        let post = postmodel.delete(data);
        res.status(200).send({status:true, data:post});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    createpost,
    getpost,
    getPostByParams,
    updatepost,
    deletepost
}