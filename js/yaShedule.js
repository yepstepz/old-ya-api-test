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
	    this.entities.filter(function(entity) {
	      if (entity.id == arg[i]){

	      	filteredEntities.push(entity);
	      }
		});
	}
	if ( filteredEntities.length == 0 ){
		throw new Error('Такой лекции нет или она была удалена! \n' +
					   	' Посмотреть текущие лекции: getEntities() ');
	}
	return filteredEntities;
}
Core.prototype.editName = function( num, name ){
		/*
		*
		* Сущность можно отредактировать только
		* по очереди, множественное редактирование
		* не нужно. 
		*
		*/
		if ( typeof(name) != 'string' ){

			throw new Error('Имя нужно указать в виде строки!');
		}
		if ( arguments < 2 || !name || name == '' ) {
			throw new Error('Вы не ввели имя!');
		}
		var entity = this.getEntity(num)[0];
			entity[ 'name' ] = name;
			return entity[ 'name' ];
}
Core.prototype.deleteEntity = function(num){
		var del = {};
		var count = 0;
		this.getEntity( num );
		if (num < 1){
			throw new Error("Введите положительный ненулевой id элемента")
		}
		var arg = arguments;
		var index;
		for (var i = 0; i < arg.length; i++) {
		    this.entities.filter(function(entity, k) {
		      if (entity.id == arg[i]){
		      	index = k;
		      }
			});
	      	del[count++] = this.entities.splice(index, 1)[0];
		}
		return del;
		
}
Core.prototype.addObjectToEntity = function( arrEntities, type, object ){
		var object = object.split(', ');
		for (var i = 0; i < arrEntities.length; i++) {
			arrEntities[i] = this.getEntity( arrEntities[i] )[0];
		}
		for (var i = 0; i < arrEntities.length; i++) {
			for (var j = 0; j < object.length; j++) {
					this._unique(arrEntities[i][type].push(object[j]));
			}
			arrEntities[i][type] = this._unique(arrEntities[i][type]);

		}
		return 'Добавлены ' + this._unique( object );
}
Core.prototype.changeEntityObject = function(arrEntities, type, oldNames, newNames){
		var oldNames = oldNames.split(', ');
		var newNames = newNames.split(', ');
		if (oldNames.length != newNames.length){
			throw new Error('Вы пытаетесь изменить массивы разной длины');
		}
		for (var i = 0; i < arrEntities.length; i++) {
			arrEntities[i] = this.getEntity( arrEntities[i] )[0];
			for (var j = 0; j < newNames.length; j++) {
				var index = this._find( arrEntities[i][type], oldNames[j]);
				entity[type][index] = args[4][i];
			}
		}
		this._unique(entity[type]);
		return "Элементы изменены";	
}
Core.prototype.editArrayEntity = function(){
		var args = arguments;
		var entity;
	    this.entities.filter(function(item) {
	      if (item.id == args[0]){
	      	entity = item;
	      }
		});
		var type = args[1];
		var del = [];
		if (args.length == 3 && args[2] == 0 ) {
			entity[type] = [];
			return "Элементы удалены";
		}
		if ( args.length == 4 && args[2] == 0 ){
			for (var i = 0; i < args[3].length; i++) {
				var index = this._find( entity[type], args[3][i]);
				if ( index != -1 ){
					entity[type].splice( index, 1);
				}
			}
			return "Элементы удалены";
		}
		if (args.length == 5 && args[2] != 0 ){
			if (args[3].length != args[4].length){
				throw new Error('Вы пытаетесь изменить массивы разной длины');
			}
			for (var i = 0; i < args[4].length; i++) {
				var index = this._find( entity[type], args[3][i]);
				entity[type][index] = args[4][i];
			}
			this._unique(entity[type]);
			return "Элементы изменены";			
		}
}
Core.prototype.addLectorToEntity = function( arrEntities, lector ){
		var lector = this._unique( lector.split(', ') );
		for (var i = 0; i < arrEntities.length; i++) {
			for (var j = 0; j < lector.length; j++) {
					arrEntities[i].lector.push(lector[j]);
			}
			arrEntities[i].lector = this._unique(arrEntities[i].lector);
		}
		return 'Добавлены ' + this._unique(lector);
}
function Lection(){ 
	Core.apply(this, arguments);
}
Lection.prototype = Object.create(Core.prototype);
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