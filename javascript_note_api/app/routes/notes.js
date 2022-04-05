var express = require('express');
var router = express.Router();
const Note = require('../models/note.js');
const withAuth = require('../middlewares/auth.js');

router.post('/', withAuth, async function(req, res) {
  const {title, body} = req.body;
  // console.log({title, body})
  
  try {
    var note = new Note({title: title, body: body, author: req.user._id}); // middleware got the user 
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({error: 'Problem to create a new note'});
  }
});

module.exports = router;