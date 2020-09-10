const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    }
});
noteSchema.statics.findOne = async function (id) {
    const note = await this.findOne({id});
    if (note) throw Error('id not exist');
    return user;
};
noteSchema.statics.create = async function (id, content) {
    await this.create({id, content}).then(result => console.log(result));
};
const Note = mongoose.model('note', noteSchema)
module.exports = Note;