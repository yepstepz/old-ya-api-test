function Core(){ 

}
Core.prototype.id = 0;
Core.prototype.entities = [];
Core.prototype._unique = function( array ){
	var obj = {};
	for (var i = 0; i < array.length; i++) {
	   var str = array[i];
	   obj[str] = true;
	}
	return Object.keys(obj);
}
Core.prototype._find = function( array, value ){
	  if (array.indexOf) { // если метод существует
	    return array.indexOf(value);
	  }

	  for (var i = 0; i < array.length; i++) {
	    if (array[i] === value) return i;
	  }

	  return -1;
}
Core.prototype.setEntity = function(obj){
	if ( !obj ){
		throw new Error('Нельзя создать лекцию без названия.');
	}
	if ( typeof(obj) != "object" ){
		throw new Error('Неправильно заданы параметры. \n'+
					    'Обратитесь к документации библиотеки help()');
	}
	this.entities.push({
	  name : obj.name,
	  id : ++this.id,
	  school : [],
	  lector : [],
	  time : []
	});
}
Core.prototype._editableProperties = [ 'name', 'time' ];
Core.prototype.getEntity = function(){
	var arg = arguments;
	if (arg.length == 0) {
		return this.entities;
	}
	var filteredEntities = [];
	for (var i = 0; i < arg.length; i++) {
	    this.entities.filter(function(lection) {
	      if (lection.id == arg[i]){
	      	filteredEntities.push(lection);
	      }
		});
	}
	if ( filteredEntities.length == 0 ){
		throw new Error('Такой лекции нет или она была удалена! \n' +
					   	' Посмотреть текущие лекции: getEntities() ');
	}
	return filteredEntities;
}
Core.prototype.editEntity = function( num, properties ){
		/*
		*
		* Сущность можно отредактировать только
		* по очереди, множественное редактирование
		* не нужно. Для лекций и школ отдельные функции,
		* так как нужна возможность не только менять, но
		* и удалять
		*
		*/
		var lection = this.getEntity(num)[0];
		for (var i = 0; i < this._editableProperties.length; i++) {
				if ( properties[ this._editableProperties[i] ] ){
						lection[ this._editableProperties[i] ] = properties[ this._editableProperties[i] ];
				}
		}
		return lection;
}
Core.prototype.deleteEntity = function(num){
		if (num < 1){
			throw new Error("Введите положительный ненулевой id элемента")
		}
		var arg = arguments;
		var index;
		var deleted = [];
		this.getEntity(num);
		for (var i = 0; i < arg.length; i++) {
		    this.entities.filter(function(lection, k) {
		      if (Core.id == arg[i]){
		      	index = k;
		      }
			});
	      	deleted.push(this.entities.splice(index, 1)[0]);
		}
		return deleted;
}
Core.prototype.addObjectToEntity = function( arrEntities, type, object ){
		var object = object.split(', ');
		console.log(object);
		//var school = school.split(', ');
		for (var i = 0; i < arrEntities.length; i++) {
			for (var j = 0; j < object.length; j++) {
					arrEntities[i][type].push(object[j]);
			}
			arrEntities[i][type] = this._unique(arrEntities[i][type]);
		}
		return 'Добавлены ' + this._unique(object);
}
// Core.prototype.addLectorToEntity = function( arrEntities, lector ){
// 		var lector = lector.split(', ');
// 		for (var i = 0; i < arrEntities.length; i++) {
// 			for (var j = 0; j < lector.length; j++) {
// 					arrEntities[i].lector.push(lector[j]);
// 			}
// 			arrEntities[i].lector = this._unique(arrEntities[i].lector);
// 		}
// 		return 'Добавлены ' + this._unique(lector);
// }
Core.prototype.editArrayEntity = function(){
		var args = arguments;
		var lection;
	    this.entities.filter(function(item) {
	      if (item.id == args[0]){
	      	lection = item;
	      }
		});
		var type = args[1];
		var del = [];
		if (args.length == 3 && args[2] == 0 ) {
			lection[type] = [];
			return lection[type];
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
function Lection(){ 
	Core.apply(this, arguments);
}
Lection.prototype = Object.create(Core.prototype);
function School(){
	this._name;
	this._count;
	this.entities = [];
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
lection.setEntity({
	name: "ООП",
});
lection.setEntity({
	name: "Мобильная"
});
lection.setEntity({
	name: "Адаптивность"
});
lection.setEntity({
	name: "Margin"
}); // добавит 4 лекции
lection.addObjectToEntity( lection.getEntity(1,3,4), 'school', 'shmd, shri, shri, lolz, lolz, shmd'); //добавит только shmd, shri, lolz
lection.deleteEntity(1); // удалит лекцию с id = 2
lection.editEntity( 2, {
	name: "Мобильная лекция для начинающих"
}); // отредактирует название у лекции с id = 2
lection.addObjectToEntity( lection.getEntity(1,3,4), 'school', 'shmd, shri, shri, lolz, lolz, shmd'); // не добавит дубли
lection.addObjectToEntity( lection.getEntity(2,4), 'lector', 'Алексей Тяпкин'); //добавит Алексея Тяпкина
//lection.editArrayEntity( 3, 'school', 0 ); // удалит все
//lection.editArrayEntity( 3, 'school', 0, ['shmd2', 'shmd']); // удалит shmd
//lection.editArrayEntity( 3, 'school', 0, ['shri', 'shmd']); // удалит два класса 'shri', 'shmd'
//lection.editArrayEntity( 3, 'school', 1, ['shmd2', 'shmr2'] ); // добавит два класса 'shmd2', 'shmr2'
//lection.editArrayEntity( 3, 'school', 1, ['shri, lolz'], ['shmr', 'lolz2'] ); // ошибка, массивы разной длины.
//lection.editArrayEntity( 3, 'school', 1, ['shri', 'lolz'], ['shmr', 'lolz2'] ); // вернет "shmd", "shmr", "lolz2"
//lection.editArrayEntity( 3, 'lector', 1, ['Арсений', 'Иван']); // Добавит двух Лекторов