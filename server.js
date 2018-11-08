//Chunyang Jia's Lab 3, 251001556

// going to use express and body parser packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//database
mongoose.connect('mongodb://localhost:27017/item');
var Item = require('./app/models/item');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Port set-up
var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req,res,next) {
    console.log('Something is happening.');
    next();
});

router.get('/',function(req, res) {
  res.json({message: 'Woohoo, welcome to chunyang api!!!'});
});


router.route('/items')

        .post(function(req,res) {
                
                var item = new Item();
                item.name = req.body.name;
                item.quantity = req.body.quantity;
                item.tax_rate = req.body.tax_rate;
                item.price = req.body.price;
        
                item.save(function(err) {
                  if(err)
                     res.send(err);
                     
                  res.json({message: 'Item created!'});
           });
        })
      
        .get(function(req,res){
            Item.find(function(err,item){
                  if(err)
                    res.send(err);
                  
                  res.json(item);
            });
        });
        
router.route('/items/:item_id')
        
        .get(function(req, res){
          
            Item.findById(req.params.item_id,function(err,item){
                 if(err)
                    res.send(err);
                  
                 res.json(item);
            });
        })

        .put(function(req,res){
          
             Item.findById(req.params.item_id,function(err,item){
               if(err)
                  res.send(err);
                
                item.name = req.body.name;
                item.quantity = req.body.quantity;
                item.tax_rate = req.body.tax_rate;
                item.price = req.body.price;
                
                item.save(function(err){
                   if(err)
                      res.send(err);
                      
                   res.json({message: 'Item updated'});
                });
             });
        })
        
        .delete(function(req,res){
              Item.remove({
                _id: req.params.item_id
              }, function(err,item){
                  if(err)
                      res.send(err);
                  
                  res.json({message: 'Successfully deleted'});
              });
        });
      

app.use('/api',router);

app.listen(port);
console.log('Magic is happening at: ' + port);