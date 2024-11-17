import mongoose from "mongoose"

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

const userSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    birthDate: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    img: { type: String, default: "https://i.imgur.com/KZhWb9J.png" },
    type: { type: String, default: "normal" },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    education: { type: Array, default: [] },
    career: { type: Array, default: [] },
    notifications: { type: Array, default: [] },
    createdAt: { type: String }
}, { versionKey: false })

userSchema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = formatDate(new Date());
    }
    next();
});

const user = mongoose.model("User", userSchema, "systemcollections")

export default user