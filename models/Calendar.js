const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Calendar = new Schema({
   id: {
      type: String,
      required: false,
      unique:true
   },
   start: {
      type: String
   },
   end: {
      type: String
   },
   title: {
      type: String
   }
});


module.exports = mongoose.model("Calendar", Calendar);
