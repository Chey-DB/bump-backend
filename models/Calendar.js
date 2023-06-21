const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Calendar = new Schema({
   user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: false,
   },
   date: {
      type: String,
      required: true
   },
   time: {
      type: String,
      required:true
   },
   title: {
      type: String,
      required: true
   },
   description:{
      type: String,
      required: false
   }
});


module.exports = mongoose.model("Calendar", Calendar);
