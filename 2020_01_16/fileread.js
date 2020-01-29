var fs = require('fs');

console.log(1);

fs.readFile('sync.txt', 'utf8',function(err, data){
    console.log(data);
});

console.log(2);
console.log(3);


