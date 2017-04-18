function Lection(){ 

}
Lection.prototype.id = 0;
Lection.prototype.lections = [];
Lection.prototype._unique = function( array ){
	var obj = {};
	for (var i = 0; i < array.length; i++) {
	   var str = array[i];
	   obj[str] = true;
	}
	return Object.keys(obj);
}
Lection.prototype.help = function(){
	return 'Начать: var lection = new Lection(); \n' +
	'Задать лекции и свойства: this.setLection( { property_name : property(string) } )\n' +
	'Редактировать лекции: this.editLection( id_лекции, { property_name : property(string) } )\n' +
	'Удалить лекцию: this.deleteLection( id_лекции ) \n' +
	'Добавить школу к лекции: this.addSchoolToLection( school1[, school2, school3...])\n' +
	'Добавить лектора: this.addLectorToLection( lector1[, lector2, lector3...])\n';
}
Lection.prototype.setLection = function(obj){
	if ( !obj ){
		throw new Error('Нельзя создать лекцию без названия.');
	}
	if ( typeof(obj) != "object" ){
		throw new Error('Неправильно заданы параметры. \n'+
					    'Обратитесь к документации библиотеки help()');
	}
	this.lections.push({
	  name : obj.name,
	  id : ++this.id,
	  school : [],
	  lector : [],
	  time : []
	});
}
Lection.prototype._editableProperties = [ 'name', 'time' ];
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
	if ( filteredLections.length == 0 ){
		throw new Error('Такой лекции нет или она была удалена! \n' +
					   	' Посмотреть текущие лекции: getLections() ');
	}
	return filteredLections;
}
Lection.prototype.editLection = function( num, properties ){
		/*
		*
		* Лекцию можно отредактировать только
		* по очереди, множественное редактирование
		* не нужно. Для лекций и школ отдельные функции,
		* так как нужна возможность не только менять, но
		* и удалять
		*
		*/
		var lection = this.getLection(num)[0];
		for (var i = 0; i < this._editableProperties.length; i++) {
				if ( properties[ this._editableProperties[i] ] ){
						lection[ this._editableProperties[i] ] = properties[ this._editableProperties[i] ];
				}
		}
}
Lection.prototype.deleteLection = function(num){
		if (num < 1){
			throw new Error("Введите положительный ненулевой id элемента")
		}
		this.getLection(num);
		this.lections.splice(num - 1, 1);
}
Lection.prototype.addSchoolToLection = function( arrLections, school ){
		var school = school.split(', ');
		for (var i = 0; i < arrLections.length; i++) {
			for (var j = 0; j < school.length; j++) {
					arrLections[i].school.push(school[j]);
			}
			arrLections[i].school = this._unique(arrLections[i].school);
		}
		return 'Добавлены ' + this._unique(school);
}
Lection.prototype.editSchoolToLection = function(){
		var school = school.split(', ');
		for (var i = 0; i < arrLections.length; i++) {
			for (var j = 0; j < school.length; j++) {
					arrLections[i].school.push(school[j]);
			}
			arrLections[i].school = this._unique(arrLections[i].school);
		}
		return 'Добавлены ' + this._unique(school);
}
Lection.prototype.addLectorToLection = function( arrLections, lector ){
		var lector = this._unique( lector.split(', ') );
		for (var i = 0; i < arrLections.length; i++) {
			for (var j = 0; j < lector.length; j++) {
					arrLections[i].lector.push(lector[j]);
			}
			arrLections[i].lector = this._unique(arrLections[i].lector);
		}
		return 'Добавлены ' + this._unique(lector);
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
}); // добавит две школы
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
}); // добавит 4 лекции
lection.addSchoolToLection( lection.getLection(1,3,4), 'shmd, shri, shri, lolz, lolz, shmd'); //добавит только shmd, shri, lolz
lection.deleteLection(1); // удалит лекцию с id = 1
lection.editLection( 2, {
	name: "Мобильная лекция для начинающих"
}); // отредактирует название у лекции с id = 2
lection.addSchoolToLection( lection.getLection(1,3,4), 'shmd, shri, shri, lolz, lolz, shmd'); // не добавит дубли
lection.addLectorToLection( lection.getLection(2,4), 'Алексей Тяпкин'); //добавит Алексея Тяпкина