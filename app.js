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

var Product = mongoose.model('products', {
  id: Number,
  name: String,
  description: String,
  detailDescription: String,
  info: String,
  reviews: Object,
  url: String,
  storeId: Number,
  price: Object,
  duration: Object,
  sticker: Object,
  img: Object
});

// LISTEN
app.listen(8888, function () {
  console.log('8888 SERVER START!!!!!');
});

app.get('/', function (req, res) {
  //db에서 전체 읽어오기
  //create a 링크, 상품 리스트 read table로, delete button이랑
  mongoose.model('products').find(function (err, products) {
    if (err) {
      throw err;
    } else {
      res.render('index', {dealData: products});
    }
  })
});

//get create product form
app.get('/create', function (req, res) {
  //create form page
  res.render('productForm');
});

//create product
app.post('/create', function (req, res) {
  var product = {
    'id': req.body.id,
    'name': req.body.name,
    'url': req.body.url,
    'price': req.body.price,
    'img': req.body.tbnailImg
  };
  //mongoose통해 생성된 product 넣기
  Product.create(product, function (err, createdProd) {
    if (err) throw err;
    res.send(createdProd);
  });
  //read page로 이동
  // res.redirect('/');
});

//DELETE
app.post('/del', function (req, res) {
  var deleteId = req.body.id;
  mongoose.model('products').find({id: deleteId}).remove(function (err, result) {
    if (err) throw err;
    res.redirect('/');
  });

});
