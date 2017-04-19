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
Lection.prototype._find = function( array, value ){
	  if (array.indexOf) { // если метод существует
	    return array.indexOf(value);
	  }

	  for (var i = 0; i < array.length; i++) {
	    if (array[i] === value) return i;
	  }

	  return -1;
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
		var arg = arguments;
		var index;
		for (var i = 0; i < arg.length; i++) {
		    this.lections.filter(function(lection, k) {
		      if (lection.id == arg[i]){
		      	index = k;
		      }
			});
	      	this.lections.splice(index, 1);
		}
		
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
Lection.prototype.editArrayLection = function(){
		var args = arguments;
		var lection;
	    this.lections.filter(function(item) {
	      if (item.id == args[0]){
	      	lection = item;
	      }
		});
		var type = args[1];
		var del = [];
		if (args.length == 3 && args[2] == 0 ) {
			lection[type] = [];
			return "Элементы удалены";
		}
		if ( args.length == 4 && args[2] == 0 ){
			for (var i = 0; i < args[3].length; i++) {
				var index = this._find( lection[type], args[3][i]);
				if ( index != -1 ){
					lection[type].splice( index, 1);
				}
			}
			return "Элементы удалены";
		}
		if (args.length == 4 && args[2] != 0 ){
			for (var i = 0; i < args[3].length; i++) {
				lection[type].push( args[3][i] );
			}
			this._unique(lection[type]);
			return "Элементы добавлены";			
		}
		if (args.length == 5 && args[2] != 0 ){
			if (args[3].length != args[4].length){
				throw new Error('Вы пытаетесь изменить массивы разной длины');
			}
			for (var i = 0; i < args[4].length; i++) {
				var index = this._find( lection[type], args[3][i]);
				lection[type][index] = args[4][i];
			}
			this._unique(lection[type]);
			return "Элементы изменены";			
		}
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
lection.deleteLection(1); // удалит лекцию с id = 2
lection.editLection( 2, {
	name: "Мобильная лекция для начинающих"
}); // отредактирует название у лекции с id = 2
lection.addSchoolToLection( lection.getLection(1,3,4), 'shmd, shri, shri, lolz, lolz, shmd'); // не добавит дубли
lection.addLectorToLection( lection.getLection(2,4), 'Алексей Тяпкин'); //добавит Алексея Тяпкина
//lection.editArrayLection( 3, 'school', 0 ); // удалит все
//lection.editArrayLection( 3, 'school', 0, ['shmd2', 'shmd']); // удалит shmd
//lection.editArrayLection( 3, 'school', 0, ['shri', 'shmd']); // удалит два класса 'shri', 'shmd'
//lection.editArrayLection( 3, 'school', 1, ['shmd2', 'shmr2'] ); // добавит два класса 'shmd2', 'shmr2'
//lection.editArrayLection( 3, 'school', 1, ['shri, lolz'], ['shmr', 'lolz2'] ); // ошибка, массивы разной длины.
//lection.editArrayLection( 3, 'school', 1, ['shri', 'lolz'], ['shmr', 'lolz2'] ); // вернет "shmd", "shmr", "lolz2"
lection.editArrayLection( 3, 'lector', 1, ['Арсений', 'Иван']); // удалит shmd