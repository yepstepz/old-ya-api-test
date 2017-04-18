console.log('Для вызова документации напишите help()');
var help = function(){
	switch(arguments[0]) {
	  case 'setLection':  // if (x === 'value1')
	    console.log('Задать лекцию. Принимает объект: \n' +
	   	'this.setLection( { property_name : property(string) } )\n' +
	   	'Нельзя задать без name(string)');
	    break;

	  case 'getLection':  // if (x === 'value2')
	    console.log('Вывести лекцию \n' +
	   	'Без аргументов выводит все лекции \n' +
	   	'С аргументом id_лекций(Number) выводит массив лекций');	    
	    break;

	  case 'editLection':  // if (x === 'value2')
	    console.log('Отредактировать лекцию \n' +
	   	'Можно отредактировать только строковые значения');	    
	    break;

	  case 'setSchoolToLection':  // if (x === 'value2')
	    console.log('Задать лекции школу \n' +
	   	'Принимает объекты лекций и строку\n'+
	   	'this.addSchoolToLection( this.lections[i], school1[, school2, school3...])');	    
	    break;

	  case 'editSchoolToLection':  // if (x === 'value2')
	    
	    break;

	  case 'setLectorToLection':  // if (x === 'value2')
	    console.log('Задать лекции лектора \n' +
	   	'Принимает объекты лекций и строку \n'+
	   	'this.addLectorToLection( this.lections[i], lector1[, lector2, lector3...])');	    
	    break;

	  case 'editSchoolToLection':  // if (x === 'value2')
	    
	    break;

	  case 'deleteLection':  // if (x === 'value2')
	    console.log('Удаляет лекцию \n' +
	    			'Принимает id_лекции');
	    break;

	  // case 'getLection':  // if (x === 'value2')
	    
	  //   break;

	  // case 'getLection':  // if (x === 'value2')
	    
	  //   break;

	  default:
		console.log('Помощь по функциям \n' +
			'setLection\n' +
			'getLection\n' +
			'editLection\n' +
			'setSchoolToLection\n' +
			'editSchoolToLection\n' +
			'setLectorToLection\n' +
			'editLectorToLection\n' +
			'deleteLectorToLection\n');
	}
	return 'Введите help( имя_функции )'

}