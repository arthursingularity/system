import mongoose from "mongoose"

const produtoAcabadoSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    code: { type: Number, required: true, unique: true },
    description: { type: String, required: true },
    recipe: { type: Number, required: true },
    weight: { type: String, required: true },
    createdAt: { type: String }
}, { versionKey: false })

const produtoAcabado = mongoose.model("produtoAcabado", produtoAcabadoSchema)

export default produtoAcabado