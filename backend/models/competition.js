const mongoose = require('mongoose');
const competitionSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },  
});
module.exports = mongoose.model('Competition', competitionSchema);
