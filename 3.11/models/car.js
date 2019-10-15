var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CarSchema = new Schema({
    model: {type: String},
    license: {type: String},
    city: {type: String},
    type: {type: String},
    fare: {type: Number},
    status: {type: String,default:'Available'},
    
});

// Virtual for this genre instance URL.
CarSchema
.virtual('url')
.get(function () {
  return '/catalog/car/'+this._id;
});

// Export model.
module.exports = mongoose.model('Car', CarSchema);
