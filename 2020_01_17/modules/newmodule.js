var myModule = {
    name : "new module",
    func : function(){
        console.log(this.name);
    }
}

module.exports = myModule;