var Car = require('../models/car');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = function(req, res) {

    async.parallel({
        book_count: function(callback) {
            Car.count(callback);
        },
       
        book_instance_available_count: function(callback) {
            Car.count({status:'Available'},callback);
        },
        
    }, function(err, results) {
        res.render('index', { title: 'Car Booking Service', error: err, data: results });
    });
};



// Display list of all car.

exports.car_list = function(req, res, next) {
console.log(Car);
  Car.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_cars) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('car_list', { title: 'Car List', list_cars:  list_cars});
    });

};

var x;
/*
//console.log(car);
 Car.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_cars) {
      if (err) { return next(err); }
      // Successful, so render

console.log(list_cars);
for(var i = 0; i < list_cars.length;i++)
{

console.log(list_cars[i].model);



}

//var obj = JSON.parse(list_cars);
    });
*/
// Display detail page for a specific car.
exports.car_detail = function(req, res, next) {

    async.parallel({



        car: function(callback) {

            Car.findById(req.params.id)
              .exec(callback);
        },

        car_books: function(callback) {
          Car.find({ 'car': req.params.id })
          .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.car==null) { // No results.
            var err = new Error('car not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('car_detail', { title: 'CAR Detail', car: results.car, car_books: results.car_books } );
    });

};

// Display car create form on GET.
exports.car_create_get = function(req, res, next) {
    res.render('car_form', { title: 'Create Car'});
};

// Handle car create on POST.
exports.car_create_post = [





    // Validate that the name field is not empty.
    body('model', 'Model name required').isLength({ min: 1 }).trim(),
    body('license', 'license name required').isLength({ min: 1 }).trim(),
    body('city', 'city name required').isLength({ min: 1 }).trim(),
    body('type', 'type name required').isLength({ min: 1 }).trim(),
    body('fare', 'fare name required').isLength({ min: 1 }).trim(),
   
    

    // Sanitize (trim) the name field.
    sanitizeBody('model').escape(),
    sanitizeBody('license').escape(),
    sanitizeBody('city').escape(),
    sanitizeBody('type').escape(),
    sanitizeBody('fare').escape(),
    
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a car object with escaped and trimmed data.
        var car = new Car(
          { model: req.body.model,
            license: req.body.license,
            city: req.body.city,
            type: req.body.type,
            fare: req.body.fare
          
            
          }
        );

/*

Car.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_cars) {
      if (err) { return next(err); }
      // Successful, so render

console.log(list_cars);
for(var i = 0; i < list_cars.length;i++)
{

console.log(list_cars[i].model);



}

//var obj = JSON.parse(list_cars);
    });



*/



        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('car_form', { title: 'Create Car', car: car, errors: errors.array()});
        return;
        }
        else {
            // Data from form is valid.
            // Check if car with same name already exists.
            Car.findOne({ 'model': req.body._id })
                .exec( function(err, found_car) {
                     if (err) { return next(err); }

                     if (found_car) {
                         // car exists, redirect to its detail page.
                         res.redirect(found_car.url);
                     }
                     else {

                         car.save(function (err) {
                           if (err) { return next(err); }
                           // car saved. Redirect to car detail page.
                           res.redirect(car.url);
                         });

                     }

                 });
        }
    }
];

// Display car delete form on GET.
exports.car_delete_get = function(req, res, next) {
console.log('hello');
    async.parallel({
        car: function(callback) {
            Car.findById(req.params.id).exec(callback);
        },
        car_books: function(callback) {
            Car.findById(  req.params.id ).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.car==null) { // No results.
            res.redirect('/catalog/cars');
        }
        // Successful, so render.
        res.render('car_delete', { title: 'Delete Car', car: results.car, car_books: results.car_books } );
    });

};

// Handle car delete on POST.
exports.car_delete_post = function(req, res, next) {
console.log('hello');
    async.parallel({
        car: function(callback) {
            Car.findById(req.params.id).exec(callback);
        },
        car_books: function(callback) {
            Car.findById(req.params.id ).exec(callback);
        },
    }, function(err, results) {
console.log('hello');
        if (err) { return next(err); }
        // Success
        {
            // car has no books. Delete object and redirect to the list of cars.
            Car.findByIdAndRemove(req.body.id, function deleteCar(err) {
                if (err) { return next(err); }
                // Success - go to cars list.
                res.redirect('/catalog/cars');
            });

        }
    });

};

// Display car update form on GET.
exports.car_update_get = function(req, res, next) {

    Car.findById(req.params.id, function(err, car) {
        if (err) { return next(err); }
        if (car==null) { // No results.
            var err = new Error('car not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('car_form', { title: 'Update Car', car: car });
    });

};

// Handle car update on POST.
exports.car_update_post = [
   
    // Validate that the name field is not empty.
    body('model', 'Model name required').isLength({ min: 1 }).trim(),
    body('license', 'license name required').isLength({ min: 1 }).trim(),
    body('city', 'city name required').isLength({ min: 1 }).trim(),
    body('type', 'type name required').isLength({ min: 1 }).trim(),
    body('fare', 'fare name required').isLength({ min: 1 }).trim(),
   
    

    // Sanitize (trim) the name field.
    sanitizeBody('model').escape(),
    sanitizeBody('license').escape(),
    sanitizeBody('city').escape(),
    sanitizeBody('type').escape(),
    sanitizeBody('fare').escape(),
    

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request .
        const errors = validationResult(req);

    // Create a car object with escaped and trimmed data (and the old id!)
        var car = new Car(
          {
           model: req.body.model,
            license: req.body.license,
            city: req.body.city,
            type: req.body.type,
            fare: req.body.fare,
          _id: req.params.id
          }
        );


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('car_form', { title: 'Update Car', car: car, errors: errors.array()});
        return;
        }
        else {
            // Data from form is valid. Update the record.
            Car.findByIdAndUpdate(req.params.id, car, {}, function (err,thecar) {
                if (err) { return next(err); }
                   // Successful - redirect to car detail page.

                   res.redirect(thecar.url);
                });
        }
    }
];
