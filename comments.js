//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.get('/api/comments', (req, res) => {
  fs.readFile(COMMENTS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', (req, res) => {
  fs.readFile(COMMENTS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const comments = JSON.parse(data);
    const newComment = {
        id: uuidv4(),
        author: req.body.author,
        text: req.body.text,
        createdAt: new Date()
      };
