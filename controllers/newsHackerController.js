const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const NewsHacker = mongoose.model('NewsHacker');

router.get('/', (req, res) => {
    res.render("newsHacker/addOrEdit", {
        viewTitle: "Insert NewsHacker"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var newsHacker = new NewsHacker();
    newsHacker.title = req.body.title;
    newsHacker.url = req.body.url;
    newsHacker.text = req.body.text;
    
    newsHacker.save((err, doc) => {
        if (!err)
            res.redirect('newsHacker/list');
        else {
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    NewsHacker.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('newsHacker/list'); }
        else {
                console.log('Error during record update : ' + err);
        }
    }).lean();
}


router.get('/list', (req, res) => {
    NewsHacker.find((err, docs) => {
        if (!err) {
            res.render("newsHacker/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving newsHacker list :' + err);
        }
    }).lean();
});



router.get('/:id', (req, res) => {
    NewsHacker.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("newsHacker/addOrEdit", {
                viewTitle: "Update NewsHacker",
                newsHacker: doc
            });
        }
    }).lean();
});

router.get('/delete/:id', (req, res) => {
    NewsHacker.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/newsHacker/list');
        }
        else { console.log('Error in newsHacker delete :' + err); }
    }).lean();
});

module.exports = router;