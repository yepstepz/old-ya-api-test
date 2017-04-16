/*
*
* Описываю основные классы для работы с расписанием.
* Lection принимает имя (string)
* School принимает имя (string) и количество (Number)
* Cabinet принимает имя (string) и вместимость (Number)
*
*/
function Lection(){ 
	this.name;
	this.school = [];
	this.lector = [];
}
Lection.prototype.lections = [];
Lection.prototype.setLection = function(){
    for (var i = 0; i < arguments.length; i++) {
      this.lections.push(arguments[i]);
      this.name = arguments[i].title;
    }
}
Lection.prototype.getLection = function(){
	return this.lections.slice();
}
Lection.prototype.addSchoolToLection = function(school){
	//for (var i = 0; i < arguments.length; i++) {
		console.log(school);
		if ( school instanceof School){
			this.school.push(arguments[i]);
		} else {
			throw new Error('Такой школы нет!')
		}
	//}
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
console.log(schools);
console.log(lections.getSchool());
var lections = new Lection();
lections.setLection({
	title: "ООП",
});
lections.addSchoolToLection('shmd');
console.log(lections);
lections.setLection({
	title: "Мобильная"
});
lections.setLection({
	title: "Адаптивность",
});

console.log(lections.getLection());