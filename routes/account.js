var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var db = req.db;
	var accountTable = db.get('users');
	accountTable.find({}, {}, function(errors, accounts){
		var data = {accounts: accounts};
		res.render('account/index', data);
	});
});

router.get('/add', function(req, res, next) {
	res.render('account/add');
});

router.post('/add', function(req, res, next) {
	var db = req.db;
	var accountTable = db.get('users');
	var account = {
		name: req.body.name,
		age: req.body.age,
		email: req.body.email
	};
	accountTable.insert(account, function(errors, result){
		res.redirect('/account');
	});
});

router.get('/delete/:id', function(req, res, next){
	var db = req.db;
	var accountTable = db.get('users');
	accountTable.remove({_id: req.params.id}, function(errors, result){
		res.redirect('/account');
	});
});

router.get('/edit/:id', function(req, res, next) {
	var db = req.db;
	var accountTable = db.get('users');
	accountTable.find({_id: req.params.id}, {}, function(errors, accounts){
		var account = accounts[0];
		var data = {account: account};
		res.render('account/edit', data);
	});
});

router.post('/edit', function(req, res, next) {
	var db = req.db;
	var accountTable = db.get('users');
	var account = {
		name: req.body.name,
		age: req.body.age,
		email: req.body.email
	};
	accountTable.update(
		{
			_id: req.body.id 
		},
		{
			$set: {
				name: req.body.name,
				age: req.body.age,
				email: req.body.email
			}
		},
		function(errors, result){
			res.redirect('/account');
		}
	);
});

module.exports = router;
