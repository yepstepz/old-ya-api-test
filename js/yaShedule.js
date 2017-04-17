function Lection(){ 
	this.name;
	//this.school = [];
	this.lector = [];
}
Lection.prototype.id = 0;
Lection.prototype.lections = [];
Lection.prototype._unique = function( array ){
	var obj = {};
	for (var i = 0; i < array.length; i++) {
	   var str = array[i];
	   obj[str] = true; // запомнить строку в виде свойства объекта
	}
	return Object.keys(obj);
}
Lection.prototype.setLection = function(obj){
	this.name = obj.name;
	this.lections.push({
	  name : obj.name,
	  id : ++this.id,
	  school : []
	});
}
Lection.prototype.getLection = function(){
	var arg = arguments;
	if (arg.length == 0) {
		return this.lections;
	}
	var filteredLections = [];
	for (var i = 0; i < arg.length; i++) {
	    this.lections.filter(function(lection) {
	      if (lection.id == arg[i]){
	      	filteredLections.push(lection);
	      }
		});
	}
	return filteredLections;
}
Lection.prototype.deleteLection = function(){
// 	var arg = arguments;
// 	for (var i = 0; i < arg.length; i++) {
// 	    this.lections.map(function(lection) {
// 	      if (lection.id == arg[i]){
// 	      	console.log(lection);
// 	      	lection = null;
// 	      }
// 		});
// 	}
// 	console.log(this.lections);
// arr.forEach(function(item, i, arr) {
//   alert( i + ": " + item + " (массив:" + arr + ")" );
});
}
Lection.prototype.addSchoolToLection = function( arrLections, school ){
		var school = this._unique( school.split(', ') );
		for (var i = 0; i < arrLections.length; i++) {
			for (var j = 0; j < school.length; j++) {
					arrLections[i].school.push(school[j]);
			}
		}
}
function School(){
	this._name;
	this._count;
	this.lections = [];
}
School.prototype.schools = [];
School.prototype.setSchool = function(){
    for (var i = 0; i < arguments.length; i++) {
      this.schools.push(arguments[i]);
      this.name = arguments[i].title;
      this.count = arguments[i].title;
    }
}
School.prototype.getSchool = function(){
	return this.schools.slice();
}
function Cabinet(name, capacity){
	this._name = name;
	this._capacity = capacity;
}
//Проверка
var schools = new School();
schools.setSchool({
	title: 'shmd',
	count: 30
});
schools.setSchool({
	title: 'shri',
	count: 40
});
var lection = new Lection();
lection.setLection({
	name: "ООП",
});
lection.setLection({
	name: "Мобильная"
});
lection.setLection({
	name: "Адаптивность"
});
lection.setLection({
	name: "Margin"
});
var lol = lection.getLection(1);
lection.addSchoolToLection( lection.getLection(1,3,4), 'shmd, shri, shri, lolz, lolz, shmd'); //добавит только shmd, shri, lolz
lection.deleteLection(2);
