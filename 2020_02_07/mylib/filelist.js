var moment = require('moment');
var currentId;
var currentFileList;


exports.deleteFromDB = function(req, res){
    var id = req.body.id;
    db.query(`delete from file where id=${id}`, function(err, results, fields){
        if(err) throw err;
        res.redirect('/');
    });
    
};

exports.insertIntoDB = function(req, res){
    var fileId = req.body.fileId;
    var detail = req.body.detail;
    var user = req.body.user;
    var category_id = req.body.category_id;
    
    var date = moment().format('YYYY-MM-DD HH:mm:ss');

    db.query(`insert into file (fileId, detail, created, updated, user, category_id) 
    values ( ?, ?, ?, ?, ?, ?)`, [fileId, detail, date, date, user, category_id], function(err, results){
        if(err) throw err;    
    
        res.redirect(`/page/${results.insertId}`);
    });
}

exports.showUpdateForm = function(req, res){
    var id = req.body.id;
    var detail = req.body.detail;
    var fileId = req.body.fileId;
    var category_id = req.body.category_id;

    res.render('main', {list: currentFileList, data: {id:id, fileId: fileId, detail: detail, category_id: category_id}, type: 'update'});
}

exports.updateDB = function(req, res){
    var id = req.body.id;
    var detail = req.body.detail;
    var category = Number(req.body.category);
    var fileId = req.body.fileId;
    var date = moment().format('YYYY-MM-DD HH:mm:ss');

    db.query(`update file set fileId = ?, detail = ?, category_id = ?, updated = ? where id=?`, [fileId, detail, category, date, id], function(err, results){
        if(err) throw err;
        res.redirect(`/page/${id}`);    
    });
}

exports.addFile = function(req, res){
    if(currentId == "Home"){
        db.query('select * from category', function(err, results){
            if(err) throw err;
            var data = {fileId: "Home", detail: "Welcome"};
            data.categoryList = results;
            console.dir(data);
            res.render('main', {list: currentFileList, data: data, type: "addFile"});    
        })
    }else{
        db.query(`select * from file where id = ${currentId}`, function(err, results, fields){
            if(err) throw err;
            var data = results[0];
            db.query('select * from category', function(req, res){
                if(err) throw err;
                data.categoryList = results;
                console.log(data.categoryList);
                res.render('main', {list: currentFileList, data: results[0], type: "addFile"});        
            })
        })   
    }
}

exports.getPageContent = function(req, res){
    var id = req.params.pageId;
    
    db.query('select * from file', function(err, results){
        currentFileList = results;
        db.query(`select * from file where id = ?`, [id], function(err, results, fields){
            if(err) throw err;
            var data = results[0];
            db.query(`select * from category left join file on file.category_id = category.id where category.id =?`, [data.category_id], function(err,  results){
                if(err) throw err;
                data.category = results[0].category;
                data.description = results[0].description;
                res.render('main', {list: currentFileList, data: data, type: 'readFile'});
            });
        });
    });
}

exports.getMainPage = function(req, res){
    currentId = "Home";

    db.query('select * from file', function(err, results, fields){
        if(err) throw err;
        currentFileList = results;
    
        var home = {
            fileId : "Home",
            detail : "Welcome"
        };
        
        res.render('main', {list: results, data: home, type: "main"});   
    }); 
}