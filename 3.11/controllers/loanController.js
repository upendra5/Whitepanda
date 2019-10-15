var Loan = require('../models/loan');
var Car= require('../models/car');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var booked_car;
var chosen_cars=[];
var loan;
// Display list of all Genre.
exports.loan_list = function(req, res, next) {

  Loan.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_loans) {
      if (err) { return next(err); }
      
      res.render('loan_list', { title: 'Loan List', list_loans:  list_loans});
    });

};


//->




Car.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_cars) {
      if (err) { return next(err); }
      // Successful, so render


for(var i = 0; i < list_cars.length;i++)
{





}


    });


//<-


 Loan.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_cars) {
      if (err) { return next(err); }
      // Successful, so render

for(var i = 0; i < list_cars.length;i++)
{




}

//var obj = JSON.parse(list_cars);
    });




exports.taken_loan= function(req, res, next) {

    
       res.render('car_form', { title: 'Create Car'});

};


// Display detail page for a specific Genre.
exports.loan_detail = function(req, res, next) {

    
        res.render('loan_detail', { title: 'LOAN Detail', loan: loan,list_loans:  chosen_cars   } );
    

};

// Display Genre create form on GET.
exports.loan_create_get = function(req, res, next) {
    res.render('loan_form', { title: 'Create Loan'});
};

// Handle Genre create on POST.
exports.loan_create_post = [

    // Validate that the name field is not empty.
    body('email', 'Model name required').isLength({ min: 1 }).trim(),
    body('city', 'city name required').isLength({ min: 1 }).trim(),
    body('type', 'type name required').isLength({ min: 1 }).trim(),
    body('start_date', 'start_date name required').isLength({ min: 1 }).trim(),
    body('end_date', 'end_date name required').isLength({ min: 1 }).trim(),
   
    

    // Sanitize (trim) the name field.
    sanitizeBody('email').escape(),
    sanitizeBody('city').escape(),
    sanitizeBody('').escape(),
    sanitizeBody('start_date').escape(),
    sanitizeBody('end_date').escape(),
    
    
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a loan object with escaped and trimmed data.
        


//->>

Car.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_cars) {
      if (err) { return next(err); }
      // Successful, so render


p=0;
for(var i = 0; i < list_cars.length;i++)
{

var s=list_cars[i].status;
//console.log(list_cars[i]);
if(s=='Available' && list_cars[i].city== req.body.city  && list_cars[i].type== req.body.type)
{
 booked_car=list_cars[i];
//->>

chosen_cars[p]=list_cars[i];
p=p+1;
//added

 }

}
console.log('chosen car');

loan= new Loan(
          { email: req.body.email,
            license: ' ',
            city: req.body.city,
            start_date: req.body.start_date,
            end_date: req.body.end_date
          
            
          }
        );
console.log(loan);
console.log('1');

console.log(chosen_cars);
res.redirect(loan.url);
 //res.render('loan_list', { title: 'Loan List', list_loans:  chosen_cars , loan: loan});

});






//<<-

        
    }
];

// Display Genre delete form on GET.
exports.loan_delete_get = function(req, res, next) {

    async.parallel({
        loan: function(callback) {
            Loan.findById(req.params.id).exec(callback);
        },
        loan_books: function(callback) {
            Loan.find({ 'loan': req.params.id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.loan==null) { // No results.
            res.redirect('/catalog/loans');
        }
        // Successful, so render.
        res.render('loan_delete', { title: 'Delete Loan', loan: results.loan, loan_books: results.loan_books } );
    });

};

// Handle Genre delete on POST.
exports.loan_delete_post = function(req, res, next) {

    async.parallel({
        loan: function(callback) {
            Loan.findById(req.params.id).exec(callback);
        },
        
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        if (1<0) {
            // Genre has books. Render in same way as for GET route.
            res.render('loan_delete', { title: 'Delete Loan', loan: results.loan, loan_books: results.loan_books } );
            return;
        }
        else {
            // Genre has no books. Delete object and redirect to the list of loans.
            Loan.findByIdAndRemove(req.body.id, function deleteGenre(err) {
                if (err) { return next(err); }
                // Success - go to loans list.
                res.redirect('/catalog/loans');
            });

        }
    });

};

// Display Genre update form on GET.
exports.loan_update_get = function(req, res, next) {

    Loan.findById(req.params.id, function(err, loan) {
        if (err) { return next(err); }
        if (loan==null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('loan_form', { title: 'Update Loan', loan: loan });
    });

};

// Handle Genre update on POST.
exports.loan_update_post = [
   
    // Validate that the name field is not empty.
    body('email', 'Model name required').isLength({ min: 1 }).trim(),
    body('license', 'license name required').isLength({ min: 1 }).trim(),
    body('city', 'city name required').isLength({ min: 1 }).trim(),
    body('start_date', 'start_date name required').isLength({ min: 1 }).trim(),
    body('end_date', 'end_date name required').isLength({ min: 1 }).trim(),
   
    

    // Sanitize (trim) the name field.
    sanitizeBody('email').escape(),
    sanitizeBody('license').escape(),
    sanitizeBody('city').escape(),
    sanitizeBody('start_date').escape(),
    sanitizeBody('end_date').escape(),
    

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request .
        const errors = validationResult(req);

    // Create a loan object with escaped and trimmed data (and the old id!)
        var loan = new Loan(
          {
           email: req.body.email,
            license: req.body.license,
            city: req.body.city,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
          _id: req.params.id
          }
        );


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('loan_form', { title: 'Update Loan', loan: loan, errors: errors.array()});
        return;
        }
        else {
            // Data from form is valid. Update the record.
            Loan.findByIdAndUpdate(req.params.id, loan, {}, function (err,theloan) {
                if (err) { return next(err); }
                   // Successful - redirect to loan detail page.
                   res.redirect(theloan.url);
                });
        }
    }
];
