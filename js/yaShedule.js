/*
 * @author yepstepz
 * @version 1.0.0
 */
function Core(){ 

}
Core.prototype.id = 0;
Core.prototype.entities = [];

/**
 * Возвращает последний id объекта.
 *
 * @return {number}.
 */
Core.prototype.lastId = function(){
	if (this.entities.length == 0){
		return 0;
	}
	return this.entities[ this.entities.length - 1 ].id;
}
/**
 * Возвращает массив с уникальными объектами. Приватная функция
 *
 * @param {array} массив с повторами.
 *
 * @return {array} уникальный массив.
 */
Core.prototype._unique = function( array ){
	var obj = {};
	for (var i = 0; i < array.length; i++) {
	   var str = array[i];
	   obj[str] = true;
	}
	return Object.keys(obj);
}
/**
 * Ищет совпадения в массиве. Приватная функция
 *
 * @param {array} массив для поиска.
 * @param {string} искомый объект
 *
 * @return {number} индекс найденного элемента.
 */
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
/**
 * Производит замену в массиве. Приватная функция
 *
 * @param {array} массив для замены.
 * @param {array} массив того, что нужно заменить
 * @param {array} массив того, на что нужно заменять
 *
 * @return {number} индекс найденного элемента.
 */
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
/**
 * Сортирует массив. Приватная функция
 *
 * @param {object}
 * @param {object}
 *
 * @return {number}
 */
Core.prototype._sort = function( obj1, obj2 ){
	return +obj1._date - +obj2._date;
}
/**
 * Создает дату из moment.js. Приватная функция
 *
 * @param {string} Дата в виде "дд.мм.гггг"
 *
 * @return {object} возвращает объект moment.js
 */
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
/**
 * Удаляет объект из массива. Приватная функция
 *
 * @param {array} Массив объектов
 * @param {array} Массив объектов, которые нужно удалить
 *
 * @return {object} возвращает удаленные объекты
 */
Core.prototype._deleteObject = function( mainArray, idArray ){
		var index = 0;
		var del = [];
		var count = 0;
		for (var i = 0; i < idArray.length; i++) {
		    mainArray.filter(function(entity, k) {
		      if (entity.id == idArray[i]){
		      	index = k;
		      }
			});
	      	del[count++] = mainArray.splice(index, 1)[0];
		}
		return del;
}
/**
 * Создает массив с расписанием. Приватная функция
 *
 * @param {array} Массив объектов, у которых указано время
 *
 * @return {array} возвращает отсортированный по датам массив
 */
Core.prototype._getShedule =  function( lectionList ){
	var lection = new Lection();
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
/**
 * Проверка попадания массива во временной интервал. Приватная функция
 *
 * @param {array} Массив объектов с датами
 * @param {object} Первая дата
 * @param {object} Вторая дата
 *
 * @return {array} возвращает отсортированный по датам массив
 */
Core.prototype._getSheduleByDate = function( datedShedule, startDate, endDate ){
	var filteredShedule = [];
	for (var i = 0; i < datedShedule.length; i++) {
		if ( +startDate <= +datedShedule[i]._date && +endDate >= +datedShedule[i]._date ) {
			filteredShedule.push(datedShedule[i]);
		}
	}
	return filteredShedule.sort(this._sort);
}
/**
 * Класс с ошибками для создания объекта.
 *
 */
Core.prototype.setEntity = function(obj){
	if ( !obj ){
		throw new Error('Нельзя создать объект без названия.');
	}
	if ( typeof(obj) != "object" || !obj.name ){
		throw new Error('Неправильно заданы параметры. \n'+
					    'Обратитесь к документации библиотеки');
	}
	return 'Базовый метод';
}
//Core.prototype._editableProperties = [ 'name', 'time' ];
/**
 * Функция для вывода объектов.
 *
 * @param {number} id объектов через запятую.
 * пустая функция вернет все объекты.
 *
 * @return {array} возвращает массив с выбранными объектами
 */
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
/**
 * Функция для переименования объекта.
 *
 * @param {number} id объекта.
 * @param {string} новое имя.
 *
 * @return {string} возвращает имя. 
 */
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
/**
 * Функция для удаления объекта из сущности.
 *
 * @param {number} id объекта.
 *
 * @return {string} возвращает удаленный объект. 
 */
Core.prototype.deleteEntity = function(num){
		var del = {};
		var count = 0;
		this.getEntity( num );
		if (num < 1){
			throw new Error("Введите положительный ненулевой id элемента")
		}
		var arg = arguments;
		var index;
		return this._deleteObject( this.entities, arg );	
}
/**
 * Функция для добавления объекта в массив параметров.
 * Например, школы в массив школ для лекции.
 *
 * @param {array} id объекта(-ов).
 * @param {string} имя массива, напр. school.
 * @param {array} Массив объектов для добавления
 *
 * @return {string} возвращает строку с описанием добавленных объектов.
 */
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
/**
 * Функция для изменения объекта в массиве параметров.
 * Например, школы в массиве школ для лекции.
 *
 * @param {array} id объекта(-ов).
 * @param {string} имя массива, напр. school.
 * @param {array} Массив объектов, которые нужно заменить
 * @param {array} Массив объектов, на которые нужно заменить
 *
 * @return {string} возвращает строку с описанием добавленных объектов.
 */
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
/**
 * Функция для изменения объекта в массиве параметров.
 * Например, школы в массиве школ для лекции.
 *
 * @param {array} id объекта.
 * @param {string} имя массива, напр. school.
 * @param {array} Массив объектов, которые нужно удалить
 *
 * @return {string} возвращает строку с описанием оставшихся объектов.
 */
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
/**
 * Проверяет, использована ли уже дата.
 *
 * @param {object} дата в виде moment.js.
 * @param {string} имя массива, напр. school.
 * @param {array} Массив объектов, которые нужно проверить
 *
 * @return {string} возвращает ошибку, если дата уже использовалась
 */
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
/**
 * Прототипы для Лекций, основные описаны выше.
 */
function Lection(){ 
	Core.apply(this, arguments);
}
Lection.prototype = Object.create(Core.prototype);
Lection.prototype.id = 0;
Lection.prototype.entities = [];
Lection.prototype.lastId = function(){
	if (this.entities.length == 0){
		return 0;
	}
	return this.entities[ this.entities.length - 1 ].id;
}
/**
 * Задает объект и добавляет его в общий массив.
 *
 * @param {object} объект с данными.
 * @param {object} obj.name имя.
 *
 * @return {string} Возврашает строку с описанием созданного объекта.
 */
Lection.prototype.setEntity = function(obj){
	Core.prototype.setEntity.apply(this, arguments);
	var id = this.lastId();
	this.entities.push({
	  name : obj.name,
	  id : ++id,
	  school : [],
	  lector : [],
	  time : []
	});
	return 'Создан объект ' + obj.name + ' c id = ' +  id;
}
/**
 * Задает дату лекции
 *
 * @param {number} объект с данными.
 * @param {string} дата в виде "дд.мм.гггг"
 *
 * @return {string} Возвращщает отформатированную дату.
 */
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
/**
 * Получает дату лекции
 *
 * @param {number} объект с данными.
 *
 * @return {string} Возвращает отформатированную дату.
 */
Lection.prototype.getDate = function( lection ){
	var date = this.getEntity( lection )[0].time;
	return date.format("D MMMM YYYY (dddd)");
}
function School(){ 
	Core.apply(this, arguments);
}
/**
 * Прототипы для School.
 */
School.prototype = Object.create(Core.prototype);
School.prototype.id = 0;
School.prototype.entities = [];
School.prototype.lastId = function(){
	if (this.entities.length == 0){
		return 0;
	}
	return this.entities[ this.entities.length - 1 ].id;
}
/**
 * Создает объект School.
 * @param {string} name имя
 * @param {number} количество
 */
School.prototype.setEntity = function(obj){
	Core.prototype.setEntity.apply(this, arguments);
	var id = this.lastId();
	this.entities.push({
	  name : obj.name,
	  id : ++id,
	  count : 0,
	  lections : [],

	});
	return 'Создан объект ' + obj.name + ' c id = ' +  id;
}
/**
 * Устанавливает количество учеников школы
 *
 * @param {number} id
 * @param {number} количество
 *
 * @return {string} Возвращает строку с информацией
 */
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
* Переименование с проверкой на уникальность.
* При переименовании заменяет в лекциях имя школы.
* 
* @param {number} id
* @param {number} на что заменить имя.
*
* @return {string} Возвращает строку с информацией
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
/*
* Выводит лекции, у которых прописана школа.
* 
* @param {number} id. Без параметров вернет все лекции со школами.
*
* @return {array} Возвращает массив с результатом
*/
School.prototype.getLections = function(){
	var entity = [];
	var lection = new Lection();
	var allLections = lection.getEntity();
	var selected = [];
	var result = [];
	if ( !arguments.length ) {
		//throw new Error('Введите id школы');
		for (var i = 0; i < this.getEntity().length; i++) {
			entity.push(this.getEntity()[i]);
		}		
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
	selected = this._unique(selected);
	for (var i = 0; i < selected.length; i++) {
		result.push(lection.getEntity( selected[i] )[0] );
	}
	return result;
}
/*
* Выводит расписание. 
* 
* @param {number} id. Без параметров вернет все лекции с датой.
*
* @return {array} Возвращает упорядоченный массив
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
	if (! arguments.length ) {
		for ( j = 0; j < this.getLections().length; j++ ){
			lectionList.push(this.getLections()[j]);
		}
	}
	return this._getShedule( lectionList );
}
/*
* Выводит расписание в заданный интервал дат. 
* 
* @param {number} id. "all" вернет все лекции с датой.
* @param {string} Первая дата
* @param {string} Вторая дата
*
* @return {array} Возвращает упорядоченный массив
*
*/
School.prototype.filterSheduleByDate = function ( arrSchool, startDate, endDate ){
	var arrSchool = arrSchool;
	var datedShedule = [];
	var startDate = this._makedate( startDate ); 
	var endDate = this._makedate( endDate );
	if ( arrSchool.length && typeof(arrSchool) == 'object' ) {
		for (var i = 0; i < arrSchool.length; i++) {
			var date = this.showShedule( arrSchool[i] );
			for (var j = 0; j < date.length; j++) {
				datedShedule.push(date[j]);
			}
		}
	}
	if ( arrSchool == 'all' ) {
		for (var i = 0; i < this.showShedule().length; i++) {
				datedShedule.push( this.showShedule()[i] );
		}
	}
	return this._getSheduleByDate( datedShedule, startDate, endDate );
}
/*
*Прототип для аудитории.
*/
function Cabinet(){ 
	Core.apply(this, arguments);
}
Cabinet.prototype = Object.create(Core.prototype);
Cabinet.prototype.entities = [];
Cabinet.prototype.lastId = function(){
	if (this.entities.length == 0){
		return 0;
	}
	return this.entities[ this.entities.length - 1 ].id;
}
Cabinet.prototype.setEntity = function(obj){
	Core.prototype.setEntity.apply(this, arguments);
	var id = this.lastId();
	var capacity = obj.capacity > 0 ? obj.capacity : 0;
	this.entities.push({
	  name : obj.name,
	  id : ++id,
	  capacity : capacity,
	  address: {
	  	place: 'ул. Льва Толстого, 16',
	  	floor: '',
	  	classroom: ''
	  },
	  lections : []
	});
	return 'Создан кабинет ' + obj.name + ' c id = ' +  id;
}
/*
* Задает вместимость аудитории.
* 
* @param {number} id. 
* @param {namber} вместимость 
*
* @return {string} Возвращает строку с описанием.
*/
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
/*
* Задает адрес аудитории.
* 
* @param {number} id. 
* @param {object} адрес в виде объекта:
* {
*  classroom: {number} номер кабинета
*  floor: {number} 	этаж
* }
*
* @return {string} Возвращает строку с описанием.
*/
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
/*
* Проверяет, вместятся ли все студенты
* 
* @param {number} id. 
* @param {object} объект лекции 
*
* @return {object} Ошибка, если не вмещаются,
* объект лекции, если все в порядке
*/
Cabinet.prototype.checkCapacity = function( cabinet, lection ){
		var school = new School();
		var schoolNames = {};
		for (var i = 0; i < school.getEntity().length; i++) {
			schoolNames[ school.getEntity()[i].name ] = school.getEntity()[i].id;
		}
		var index = [];
		for (var j = 0; j < lection.school.length; j++) {
			index.push( this._find( Object.keys( schoolNames ), lection.school[j] ) );
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

		return lection;
}
/*
* Проверяет, есть ли у лекции уже кабинет
* 
* @param {object} объект лекции 
*
* @return {object} Ошибка, если есть,
* объект лекции, если все в порядке
*/
Cabinet.prototype.checkOtherCabinets = function( lection ){
	var id = lection.id;
	var cabinetAll = this.getEntity();
	for (var i = 0; i < cabinetAll.length; i++) {
			for (var j = 0; j < cabinetAll[ i ].lections.length; j++){
				if (cabinetAll[ i ].lections[ j ].id == id) {
					var cabinetName = cabinetAll[i].name;
					var cabinetId = cabinetAll[i].id;
					throw new Error('Лекция c id = '+ id +' уже проводится в аудитории "' + 
									 cabinetName + '" c id = ' + cabinetId);
				}
			}
	}
	return true;
}
/*
* Задает лекции аудитории.
* 
* @param {number} id. 
* @param {array} массив лекций
*
* @return {string} Строка с описанием 
*/
Cabinet.prototype.setLections = function( id, arrLections ){
	var lection = new Lection();
	var cabinet = this.getEntity( id )[0];
	var lections = [];
	if ( arrLections.length ) {
		for (var i = 0; i < arrLections.length; i++) {
			lections.push( lection.getEntity( arrLections[i] )[0] );
		}
	} else {
		lections.push(lection.getEntity( arrLections )[0]);
	}
	for (var i = 0; i < lections.length; i++) {
			this.checkOtherCabinets( lections[i] )
			cabinet.lections.push( this.checkCapacity( cabinet, lections[i] ) );
	}
	return "Добавлены " + lections.length + ' лекции \n ' +
		   "к аудитории " + cabinet.name + " c id = " + arrLections.join(", ");	
}
/*
* Удаляет лекции из аудитории
* 
* @param {number} id. 
* @param {array} массив лекций
*
* @return {object} объект удаленных лекций 
*/
Cabinet.prototype.deleteLections = function( id, arrLections ){
	var cabinet = this.getEntity( id )[0];
	var ids = [];
	if ( cabinet.lections.length == 0){
		throw new Error("Здесь нет лекций");
	}
	if ( arrLections.length) {
		for (var i = 0; i < arrLections.length; i++) {
			ids.push( arrLections[i] );
		}
	} else {
		ids = arrLections;
	}
	return this._deleteObject( cabinet.lections, ids);
}
/*
*Показывает расписание.
*Работает аналогично School.prototype.showShedule
*/
Cabinet.prototype.showShedule = function(){
	var lection = new Lection();
	var arg = arguments;
	var shedule = [];
	var ids = arguments;
	var lectionList = [];
	var allCabinet = this.getEntity();
	if ( ids.length ) {
		for (var i = 0; i < ids.length; i++) {
			var cabinet = this.getEntity( ids[i] )[0];
			for (var j = 0; j < cabinet.lections.length; j++) {
				lectionList.push(cabinet.lections[j]);
			}
		}
	}
	if (! arguments.length ) {
		for (var i = 0; i < allCabinet.length; i++) {
			for ( j = 0; j < allCabinet[i].lections.length; j++){
				lectionList.push(allCabinet[i].lections[j]);
			}

		}
	}
	return this._getShedule(lectionList);

}
Cabinet.prototype.filterSheduleByDate = function( arrCabinet, startDate, endDate ){
	var arrCabinet = arrCabinet;
	var datedShedule = [];
	var startDate = this._makedate( startDate ); 
	var endDate = this._makedate( endDate );
	if ( arrCabinet.length && typeof(arrCabinet) == 'object' ) {
		for (var i = 0; i < arrCabinet.length; i++) {
			var date = this.showShedule( arrCabinet[i] );
			for (var j = 0; j < date.length; j++) {
				datedShedule.push(date[j]);
			}
		}
	}
	if ( arrCabinet == 'all' ) {
		for (var i = 0; i < this.showShedule().length; i++) {
				datedShedule.push( this.showShedule()[i] );
		}
	}
	return this._getSheduleByDate( datedShedule, startDate, endDate );
}