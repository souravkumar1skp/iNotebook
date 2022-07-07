const mongoose= require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
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