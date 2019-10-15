var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LoanSchema = new Schema({
    
    email: {type: String},
    license: {type: String},
    city: {type: String},
    start_date: {type: String},
    end_date: {type: String},
    
    
});

// Virtual for this genre instance URL.
LoanSchema
.virtual('url')
.get(function () {
  return '/catalog/loan/'+this._id;
});



LoanSchema
.virtual('1')
.get(function () {
  return this.email;
});

// Export model.
module.exports = mongoose.model('Loan', LoanSchema);
