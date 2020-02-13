var mysql = require('mysql');
var categoryList;

exports.getCategory = function(req, res){
    db.query('select * from category', function(err, results){
        if(err) throw err;
        categoryList = results;
        res.render('category', {data : results, type : "show"});
    });
};

exports.deleteCategory = function(req, res){
    var id = Number(req.body.id);

    db.query('select * from category inner join file on category.id = file.category_id where category.id = ?', [id], function(err, results){
        if(err) throw err;
        
        if(results.length != 0 ) {
            res.render('deleteAlert');
        } else {
            db.query('delete from category where id = ?', [id], function(err, results){
                if(err) throw err;
                res.redirect('/category/show');
            })    
        }            
    })    
}

exports.showUpdateForm = function(req, res){
    var id = req.body.id;
    
    res.render('category', {data: categoryList, type: 'update', id: id});
}

exports.updateCategory = function(req,res){
    var id = req.body.id;
    var category = req.body.category;
    var description = req.body.description;
    
    var data = {id: id, category:  category, description: description};
    
    db.query('update category set category = ?, description = ? where id = ? ', [category, description, id], function(err, results){
        res.redirect('/category/show');
    })
}

exports.insertCategory = function(req, res){
    var category =  req.body.category;
    var description = req.body.description;

    db.query('insert into category (category, description) values ( ?, ? )', [category, description], function(err, results){
        if(err) throw err;
        res.redirect('/category/show');
    })
}