const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Calendar = new Schema({
   user_id: {
      type: String,
      required: true,
   },
   start: {
      type: String,
      required: true
   },
   end: {
      type: String,
      required:true
   },
   title: {
      type: String,
      required: true
   }
});


module.exports = mongoose.model("Calendar", Calendar);
