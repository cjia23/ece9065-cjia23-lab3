//Chunyang Jia's Lab 3, 251001556

// going to use express and body parser packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//databaseg
mongoose.connect('mongodb://localhost:27017/bears');
var Bear = require('./app/models/bear');

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


router.route('/bears')

        .post(function(req,res) {
                
                var bear = new Bear();
                bear.name = req.body.name;
        
                bear.save(function(err) {
                  if(err)
                     res.send(err);
                     
                  res.json({message: 'Bear created!'});
           });
        })
      
        .get(function(req,res){
            Bear.find(function(err,bears){
                  if(err)
                    res.send(err);
                  
                  res.json(bears);
            });
        });
        
router.route('/bears/:bear_id')
        
        .get(function(req, res){
          
            Bear.findById(req.params.bear_id,function(err,bear){
                 if(err)
                    res.send(err);
                  
                 res.json(bear);
            });
        })
        
        .put(function(req,res){
          
             Bear.findById(req.params.bear_id,function(err,bear){
               if(err)
                  res.send(err);
                
                bear.name = req.body.name;
                
                bear.save(function(err){
                   if(err)
                      res.send(err);
                      
                   res.json({message: 'Bear updated'});
                });
             });
        })
        
        .delete(function(req,res){
              Bear.remove({
                _id: req.params.bear_id
              }, function(err,bear){
                  if(err)
                      res.send(err);
                  
                  res.json({message: 'Successfully deleted'});
              });
        });
      

app.use('/api',router);

app.listen(port);
console.log('My server is running at: ' + port);