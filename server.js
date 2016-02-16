var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('shoppingList',['shoppingList']);
var bodyParser=require('body-parser');

app.use(express.static(__dirname+'/App'));
app.use(bodyParser.json());

app.get('/shoppingList',function(req,res){
	//res.send("Server gets a 'Get Request'.");
	console.log("Server gets a 'GET Request'.");
	db.shoppingList.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/shoppingList',function(req,res){
	console.log("Server gets a 'POST request'.");
	console.log(req.body);
	db.shoppingList.insert(req.body,function(err,doc){
		res.json(doc);
	});
});

app.delete('/shoppingList/:id',function(req,res){
	console.log("Server gets a 'DELETE request'.");
	var id=req.params.id
	console.log("Server: delete item id= "+id);
	db.shoppingList.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.get('/shoppingList/:id',function(req,res){
	console.log("Server gets a 'GET One request'.");
	var id=req.params.id;
	console.log("Server: Get item id="+id);
	db.shoppingList.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.put('/shoppingList/:id',function(req,res){
	var id=req.params.id;
	//console.log(id);
	console.log(req.body);
	db.shoppingList.findAndModify({
		query:{_id:mongojs.ObjectId(id)},
		update:{$set:{itemType:req.body.itemType,itemName:req.body.itemName,itemBrand:req.body.itemBrand,itemPrice:req.body.itemPrice,itemComment:req.body.itemComment}},
		new:true
	},function(err,doc){
		res.json(doc);
	});
});

app.listen(3000);
console.log("ShopList App - Server is running.");