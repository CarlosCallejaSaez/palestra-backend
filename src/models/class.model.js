import mongoose from 'mongoose';

const { Schema } = mongoose;

const classSchema = new Schema({
    name: String,
    time: String,
    imageUrl: String, 
  });
  
  const Class = mongoose.model('Class', classSchema);
  
  export default Class