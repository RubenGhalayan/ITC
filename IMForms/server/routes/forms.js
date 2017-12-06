var express = require('express');
var router = express.Router();
var formCtrl = require('../forms/controller');

router.use(function (req, res, next) {
    next();
});

router.get('/', formCtrl.getForm); // Return the description of a form
router.post('/', formCtrl.addForm); //Add a form for specified user
router.delete('/:id', formCtrl.deleteForm); //Delete a form by ID
router.put('/:id', formCtrl.updateForm); //Update a form by ID
router.get('/myForms/:userID', formCtrl.getFormsForUser); //Return forms list by user ID
router.delete('/myForms/:formID/all', formCtrl.deleteFilledForms); //Delete all filled forms by form ID
router.delete('/myForms/:formID/:ids', formCtrl.deleteFilledRowsForAForm); //Delete some filled forms
router.put('/myforms/:formID/:ids', formCtrl.shareFormWithUsers); //Share form with users
router.get('/getAllForms', formCtrl.getAllForms); //Get published and shared forms
router.get('/getSavedForms', formCtrl.getSavedForms); //Get saved forms
router.post('/addFilledData', formCtrl.addFilledForm); //Add filled form by form ID
router.get('/getFilledData/:formId', formCtrl.getFilledForm); //Return filled data by formId
router.post('/upload', formCtrl.uploadImage);
router.put('/unPublished/:id', formCtrl.unPublishedForm); //unPublishedForm form

module.exports = router;
