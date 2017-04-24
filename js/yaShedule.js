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
	  var array = array.join(', ').toLowerCase().split(', ');
	  var value = value.toLowerCase();
	  if (array.indexOf) {
	    return array.indexOf(value);
	  }
	  for (var i = 0; i < array.length; i++) {
	    if ( array[i] === value ) return i;
	  }

	  return -1;
}
Core.prototype._change = function( mainArray, firstWords, secondWords ){
	for (var i = 0; i < firstWords.length; i++) {
			var index = this._find( mainArray, firstWords[i] );
			if ( index != -1 && secondWords.length ) {
				mainArray[index] = secondWords[i];
			} else {
				mainArray.splice( index, 1 );
			} 
	}
	return mainArray;
}
Core.prototype._sort = function( obj1, obj2 ){
	return +obj1._date - +obj2._date;
}
Core.prototype._makedate = function( date ){
		var typedDate = date;
		var regExp = /^[0-9]{2}[.]{1}[0-9]{2}[.]{1}[0-9]{4}$/;
		if ( typeof( date ) != 'string' || date == '' ) { 
			throw new Error('Введите дату в формате дд.мм.гггг');
		}
		if ( !regExp.test(date) ){
			throw new Error('Неверный формат даты. Введите дд.мм.гггг');
		}
		date = date.split('.');
		var day = +date[0];
		var month = +date[1];
		var year = +date[2];
		date = moment([year, month - 1, day]);
		if(date._d == 'Invalid Date'){
			throw new Error("Даты " + typedDate + " не существует!" +
							" Сверьтесь с календарем");
		}
		return date;
}
Core.prototype.setEntity = function(obj){
	if ( !obj ){
		throw new Error('Нельзя создать объект без названия.');
	}
	if ( typeof(obj) != "object" || !obj.name ){
		throw new Error('Неправильно заданы параметры. \n'+
					    'Обратитесь к документации библиотеки help()');
	}
	return 'Базовый метод';
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
		throw new Error('Такого объекта нет или он был удален! \n' +
					   	' Посмотреть текущие объекты: getEntities() ');
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
		var ent = this.getEntity( num )[0];
		var allents = this.getEntity();
		for (var i = 0; i < allents.length; i++) {
			var lowerName = name.toLowerCase();
			var lowerNameAll = allents[i].name.toLowerCase();
			if ( lowerNameAll == lowerName ){
				throw new Error("Такое имя уже существует!");
			}
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
		var entity = [];
		if (type == 'time' || type == "name" ){
			throw new Error('Нельзя добавить к ' + type +
							' через эту функцию.');
		}
		if ( typeof(object) != 'string'  ){
			throw new Error('Неправильно введены данные');
		}
		if ( arrEntities.length ) {
			for (var i = 0; i < arrEntities.length; i++) {
				entity.push(this.getEntity( arrEntities[i] )[0]);
			}
		} else {
			entity.push(this.getEntity( arrEntities )[0]);
		}
		var object = object.split(', ');
		for (var i = 0; i < entity.length; i++) {
			for (var j = 0; j < object.length; j++) {
					this.checkDate( entity[i].time, type, object );
					this._unique(entity[i][type].push(object[j]));
			}
			entity[i][type] = this._unique(entity[i][type]);

		}
		return 'Добавлены ' + this._unique( object );
}
Core.prototype.changeEntityObject = function(arrEntities, type, oldNames, newNames){
		if (type == 'time' || type == "name" ){
			throw new Error('Нельзя изменить ' + type +
							' через эту функцию.');
		}
		if ( typeof(oldNames) != 'string' || typeof(newNames) != 'string'  ){
			throw new Error('Неправильно введены данные');
		}
		var oldNames = oldNames.split(', ');
		var newNames = newNames.split(', ');
		var entity = [];
		var result = [];
		if (oldNames.length != newNames.length){
			throw new Error('Вы пытаетесь изменить массивы разной длины');
		}
		if ( arrEntities.length ) {
			for (var i = 0; i < arrEntities.length; i++) {
				entity.push(this.getEntity( arrEntities[i] )[0]);
			}
		} else {
			entity.push(this.getEntity( arrEntities )[0]);
		}
		for (var i = 0; i < entity.length; i++) {
			if ( entity[i].time.length != 0 ) {
				this.checkDate( entity[i].time, type, newNames );
			}
			entity[i][type] = this._change( entity[i][type], oldNames, newNames );
			result.push( entity[i][type] );
		}
		return this._unique( result ).join(', ');
}
Core.prototype.deleteEntityObject = function( entity, type, array ){
		/*
		*
		* Удалить только
		* по очереди, множественное удаление
		* не нужно, чтобы обезопасить пользователя 
		*
		*/
		if ( typeof( entity ) != 'number' ) {
			throw new Error('Введите id одного объекта');
		}
		var entity = this.getEntity( entity )[0];
		if (type == 'time' || type == "name" ){
			throw new Error('Нельзя удалить ' + type);
		}
		if ( array == 0 ) {
			entity[type] = [];
			return "Массив "+ type + " сейчас пустой." + entity[type];
		}
		var array = array.split(', ');
		return "Остались элементы: " + 
				this._change( entity[type], array, [] ).join(', ');

}
Core.prototype.checkDate = function ( date, type, array ){
	var double = [];
	for (var i = 0; i < this.entities.length; i++) {
		if ( +this.entities[i].time == +date && 
			 +this.entities[i].time != 0 &&
			 +date != 0  ){
			double.push(this.entities[i]);
		}
	}
	if ( double.length != 0 ) {
		for (var i = 0; i < double.length; i++) {
			var dbl = double[i][type].join(', ').toLowerCase().split(', ');
			for (var j = 0; j < array.length; j++) {
				var arr = array[j].toLowerCase();
				if ( dbl.indexOf( arr ) != -1){
					throw new Error("Этот день уже занят! Выберите другую дату.");
				}
			}
		}
	}
	return true;
}
function Lection(){ 
	Core.apply(this, arguments);
}
Lection.prototype = Object.create(Core.prototype);
Lection.prototype.id = 0;
Lection.prototype.entities = [];
Lection.prototype.setEntity = function(obj){
	Core.prototype.setEntity.apply(this, arguments);
	this.entities.push({
	  name : obj.name,
	  id : ++this.id,
	  school : [],
	  lector : [],
	  time : []
	});
	return 'Создан объект ' + obj.name + ' c id = ' +  this.id;
}
Lection.prototype.setDate = function( lection, date ){
		var date = this._makedate( date );
		var lection =  this.getEntity( lection )[0];
		if ( lection.school.length == 0 ) { 
			throw new Error('Школа для лекции не назначена ' +
							'или была удалена. \n Назначьте школу ' +
							'addObjectToEntity(' + lection.id +
							', "school", имя_школы)');
		}
		this.checkDate( date, 'school', lection.school );
		this.checkDate( date, 'lector', lection.lector );
		lection.time = date;
		return lection.time.format("D MMMM YYYY (dddd)");
}
Lection.prototype.getDate = function( lection ){
	var date = this.getEntity( lection )[0].time;
	return date.format("D MMMM YYYY (dddd)");
}
function School(){ 
	Core.apply(this, arguments);
}
School.prototype = Object.create(Core.prototype);
School.prototype.id = 0;
School.prototype.entities = [];
School.prototype.setEntity = function(obj){
	Core.prototype.setEntity.apply(this, arguments);
	this.entities.push({
	  name : obj.name,
	  id : ++this.id,
	  count : 0,
	  lections : [],

	});
	return 'Создан объект ' + obj.name + ' c id = ' +  this.id;
}
School.prototype.setCount = function( id, number ){
	if ( typeof( number ) != 'number' ) {
		throw new Error('Введите число');
	}
	if ( typeof( id ) != 'number' ) {
		throw new Error('Введите число');
	}
	var school = this.getEntity( id )[0];
	school.count = number;
	return "Количество человек в школе: " + number;
}
/*
*
* Здесь можно реализовать переименование
* лекций при переименовании таких в школе.
*
*/
School.prototype.editName = function( id, str ){
	if ( typeof( str ) != 'string' || str == '' ) {
		throw new Error('Введите название в кавычках');
	}
	if ( typeof( id ) != 'number' ) {
		throw new Error('Введите число');
	}
	var school = this.getEntity( id )[0];
	var allSchools = this.getEntity();
	for (var i = 0; i < allSchools.length; i++) {
		var lowerName = str.toLowerCase();
		var lowerNameAll = allSchools[i].name.toLowerCase();
		if ( lowerNameAll == lowerName){
			throw new Error("Такая школа уже существует!");
		}
	}
	var oldNameLections = this.getLections( id );
	var oldName = school.name;
	for (var i = 0; i < oldNameLections.length; i++) {
		var index = this._find(oldNameLections[i].school, oldName);
		oldNameLections[i].school[ index ] = str;
	}
	school.name = str;
	return "Новое название: " + str;
}
School.prototype.getLections = function(){
	var entity = [];
	var lection = new Lection();
	var allLections = lection.getEntity();
	var selected = [];
	var result = [];
	if ( arguments.length < 1 ) {
		throw new Error('Введите id школы');
	}
	if ( arguments.length ) {
		for (var i = 0; i < arguments.length; i++) {
			entity.push(this.getEntity( arguments[i] )[0]);
		}
	}
	for (var i = 0; i < entity.length; i++) {
		for (var j = 0; j < allLections.length; j++) {
			if ( this._find( allLections[j].school, entity[i].name ) != -1 ){
				selected.push(allLections[j].id);
			}
		}
	}
	// if ( selected.length == 0 ) {
	// 	throw new Error('Не найдено лекций с такой школой. \n' + 
	// 					'добавьте школу лекции: addObjectToEntity' +
	// 					'( id_лекции, "school", имя_школы );');
	// }
	selected = this._unique(selected);
	for (var i = 0; i < selected.length; i++) {
		result.push(lection.getEntity( selected[i] )[0] );
	}
	return result;
}
/*
*
* Можно объединить эти две функции,
* отрегулировать работу в зависимости от
* количества аргументов. Но мне показалось
* нужным разделить их.
*
*/
School.prototype.showShedule = function (){
	var lection = new Lection();
	var lectionList = [];
	var date = 0;
	var showDate = 0;
	for (var i = 0; i < arguments.length; i++) {
		for ( j = 0; j < this.getLections( arguments[i] ).length; j++){
			lectionList.push(this.getLections( arguments[i] )[j]);
		}

	}
	var shedule = [];
	for (var i = 0; i < lectionList.length; i++) {
		if ( lectionList[i].time > 0 ) {
			date = lectionList[i].time;
			showdate = lection.getDate( lectionList[i].id );
		} else {
			continue;
		}
		shedule.push({
			school: lectionList[i].school.join(', '),
			name: lectionList[i].name,
			lector: lectionList[i].lector.join(', '),
			showdate: showdate,
			_date: date
		});
	}
	return shedule.sort(this._sort);
}
School.prototype.filterSheduleByDate = function ( arrSchool, startDate, endDate ){
	var arrSchool = arrSchool;
	var datedShedule = [];
	var filteredShedule = [];
	var startDate = this._makedate( startDate ); 
	var endDate = this._makedate( endDate );
	if ( arrSchool.length ) {
		for (var i = 0; i < arrSchool.length; i++) {
			var date = this.showShedule( arrSchool[i] );
			for (var j = 0; j < date.length; j++) {
				datedShedule.push(date[j]);
			}
		}
	}
	for (var i = 0; i < datedShedule.length; i++) {
		if ( +startDate <= +datedShedule[i]._date && +endDate >= +datedShedule[i]._date ) {
			filteredShedule.push(datedShedule[i]);
		}
	}
	return filteredShedule.sort(this._sort);
}
function Cabinet(){ 
	Core.apply(this, arguments);
}
Cabinet.prototype = Object.create(Core.prototype);
Cabinet.prototype.id = 0;
Cabinet.prototype.entities = [];
Cabinet.prototype.setEntity = function(obj){
	Core.prototype.setEntity.apply(this, arguments);
	var capacity = obj.capacity > 0 ? obj.capacity : 0;
	this.entities.push({
	  name : obj.name,
	  id : ++this.id,
	  capacity : capacity,
	  address: {
	  	place: 'ул. Льва Толстого, 16',
	  	floor: '',
	  	classroom: ''
	  },
	  lections : []
	});
	return 'Создан кабинет ' + obj.name + ' c id = ' +  this.id;
}
Cabinet.prototype.setCapacity = function( id, number ){
	if ( typeof( number ) != 'number' ) {
		throw new Error('Введите число');
	}
	if ( typeof( id ) != 'number' ) {
		throw new Error('Введите число');
	}
	var cabinet = this.getEntity( id )[0];
	cabinet.capacity = number;
	return "Количество мест в аудитории: " + number;
}
Cabinet.prototype.setAddress = function(id, address) {
	if ( typeof(address) != 'object'){
		throw new Error('Адрес нужно указать в виде {type: name}!');
	}
	if ( arguments < 2 ) {
		throw new Error('Вы не ввели адрес!');
	}
	var fullAddress = [];	
	var cabinet = this.getEntity( id )[0];
	var cabinetAll = this.getEntity();
	address.classroom = "кабинет " + address.classroom;
	for (var i = 0; i < cabinetAll.length; i++) {
		if ( cabinetAll[i].address.classroom == address.classroom ){
			throw new Error('Адрес совпадает с другой аудиторией');
		}
	}
	if ( address.floor ) {
		cabinet.address.floor = 'этаж ' + address.floor;
	}
	if ( address.classroom ) {
		cabinet.address.classroom = address.classroom;
	}
	for (item in cabinet.address){
		if( cabinet.address[item] != ''){
			fullAddress.push(cabinet.address[item]);
		}
	}
	return "Адрес аудитории: " + fullAddress.join(', ');	
}
Cabinet.prototype.setLections = function( id, arrLections ){
	var lection = new Lection();
	var lections;
	var school = new School();
	var schoolNames = {};
	var cabinet = this.getEntity( id )[0];

	for (var i = 0; i < school.getEntity().length; i++) {
		schoolNames[ school.getEntity()[i].name ] = school.getEntity()[i].id;
	}
	lections = [];
	if ( arrLections.length ) {
		for (var i = 0; i < arrLections.length; i++) {
			lections.push( lection.getEntity( arrLections[i] )[0] );
		}
	} else {
		lections.push(lection.getEntity( arrLections )[0]);
	}
	for (var i = 0; i < lections.length; i++) {
		var index = [];
		for (var j = 0; j < lections[i].school.length; j++) {
			index.push( this._find( Object.keys( schoolNames ), lections[i].school[j] ) );
		}
		var ids = [];
		for (var j = 0; j < index.length; j++) {
			ids.push(schoolNames[ Object.keys( schoolNames )[ index[j] ] ] );
		}
		var count = 0;
		for (var j = 0; j < ids.length; j++) {
			count += school.getEntity( ids[j] )[0].count;
		}
		if( count > cabinet.capacity ){
			throw new Error("Кабинет " + cabinet.name +
							" c id = "+ cabinet.id + 
							" не уместит "+ count +" студентов. \n" +
							"Максимальная вместительность: " + cabinet.capacity +
							". Выберите другую");
		}
		cabinet.lections.push(lections[i]);
/*
*
* Сделать проверку на то, что аудитория для лекции уже была добавлена.
* Сделать вместо id - lastid.
* Сделать минимальный графический интерфейс
*
*
*
*/

	}
}
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
});
lection.setEntity({
	name: "Замыкания"
});
lection.setEntity({
	name: "Промисы"
});
lection.setEntity({
	name: "Верстка"
}); // добавит 4 лекции
lection.addObjectToEntity([5,7], 'school', 'Школа Продвижения сайтов');
lection.addObjectToEntity([6], 'school', 'Школа Менеджмента');
lection.setDate(5, "22.05.2017");
lection.setDate(6, "23.07.2017");
lection.setDate(7, "20.02.2017");
var school = new School();
school.setEntity({
	name: "Школа Мобильной Разработки",
	count: 20
});
school.setEntity({
	name: "Школа Менеджмента"
});
school.setEntity({
	name: "Школа Анализа Данных"
});
school.setEntity({
	name: "Школа Интернет-Маркетинга"
});
school.setEntity({
	name: "Школа Продвижения сайтов"
});
school.setCount(2, 30);
school.setCount(3, 25);
school.setCount(5, 30);
school.setCount(4, 20);
var cabinet = new Cabinet();
cabinet.setEntity({
	name: "Синяя аудитория",
	capacity: 60
});
cabinet.setEntity({
	name: "Красная аудитория"
});
cabinet.setEntity({
	name: "Зеленая аудитория"
});
cabinet.setEntity({
	name: "Розовая аудитория"
});

cabinet.setCapacity(2, 100);
cabinet.setCapacity(3, 200);
cabinet.setCapacity(4, 200);
