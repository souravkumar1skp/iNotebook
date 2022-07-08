const mongoose= require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Tag: {
        type: String,
        default: 'general'
    },
    Date: {
        type: Date,
        default: Date.now
    }
  });
  const mynotes= mongoose.model('notes', NotesSchema);
  mynotes.createIndexes();
  module.exports= mynotes;