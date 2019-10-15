var express = require('express');
var router = express.Router();


// Require our controllers.


var car_controller = require('../controllers/carController');
var loan_controller = require('../controllers/loanController');



/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', car_controller.index);  


//Car routes

// GET request for creating a . NOTE This must come before route that displays  (uses id).
router.get('/car/create', car_controller.car_create_get);

// POST request for creating .
router.post('/car/create', car_controller.car_create_post);

// POST request to delete .
router.post('/car/:id/delete', car_controller.car_delete_post);

// GET request to update .
router.get('/car/:id/update', car_controller.car_update_get);

// POST request to update .
router.post('/car/:id/update', car_controller.car_update_post);

router.get('/car/:id', car_controller.car_detail);

// GET request for list of 
router.get('/cars', car_controller.car_list);

//Loan routes

// GET request for creating a . NOTE This must come before route that displays  (uses id).
router.get('/loan/create', loan_controller.loan_create_get);

// POST request for creating .
router.post('/loan/create', loan_controller.loan_create_post);

// POST request to delete .
router.post('/loan/:id/delete', loan_controller.loan_delete_post);

// GET request to update .
router.get('/loan/:id/update', loan_controller.loan_update_get);

// POST request to update .
router.post('/loan/:id/update', loan_controller.loan_update_post);

router.get('/loan/:id', loan_controller.loan_detail);
router.post('/loan/:id/detail', loan_controller.taken_loan);

// GET request for list of 
router.get('/loans', loan_controller.loan_list);



module.exports = router;
