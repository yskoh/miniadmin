var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/minimall');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

// LISTEN
app.listen(8888, function () {
  console.log('8888 SERVER START!!!!!');
});

app.get('/', function (req, res) {
  //db에서 전체 읽어오기
  //create a 링크, 상품 리스트 read table로, delete button이랑
  res.render('index');
});

//get create product form
app.get('/create', function (req, res) {
  //create form page
});

//create product
app.post('/create', function (req, res) {
  var product = {
    'id': req.body.id,
    'name': req.body.name,
    'url': req.body.url,
    'price': req.body.price,
    'tbnailImg': req.body.tbnailImg
  };
  //mongoose통해 생성된 product 넣기
  //read page로 이동
  res.redirect('/');
});

//DELETE
app.post('/del', function (req, res) {

  var deleteId = req.query.id;

});
