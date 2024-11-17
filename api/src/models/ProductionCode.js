import mongoose from "mongoose";

const productionCodeSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    code: { type: String, required: true, unique: true },
    cards: {
        type: Object,
        default: {
            comercio: [{
                id: new mongoose.Types.ObjectId(),
                paCode: 0,
                paDescription: "description",
                paRecipe: 0,
                paWeight: "",
                quantity: 0,
                status: "produzindo",
                label: 1,
                type: "comercio"
            }],
            ps: [{
                id: new mongoose.Types.ObjectId(),
                paCode: 0,
                paDescription: "",
                paRecipe: 0,
                paWeight: "",
                quantity: 0,
                status: "produzindo",
                label: 1,
                type: "ps"
            }]
        }
    },
    comProduction: { type: Number, default: 0 },
    psProduction: { type: Number, default: 0 },
    totalProduction: { type: Number, default: 0 },
    generatedBy: { type: Array, required: true, default: [] }
}, { versionKey: false });

const productionCode = mongoose.model("productionCodes", productionCodeSchema);

export default productionCode;

