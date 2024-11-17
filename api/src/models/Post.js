import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    url: String,
})

const Model = mongoose.model("images", PostSchema)

export default Model