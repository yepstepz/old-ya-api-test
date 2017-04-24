describe("Расписание", function() {
describe("Лекции", function() {
  describe("constructor", function() {
  	describe("Удаление элемента", function() {
	  it("удалит лекцию c указанным id", function() {
	  	var lection = new Lection();
	    assert.equal(lection.deleteEntity(1)[0].id, 1 );
	  });
	  it("выдает ошибку при попытке удалить повторно", function() {
	  	var lection = new Lection();
	    assert.throws(function () { lection.deleteEntity(1) }, Error);
	  });
  	});
	describe("Добавление массива элементов", function() {
	  it("добавит школу к одной лекции", function() {
	  	var lection = new Lection();
	   	assert.equal(lection.addObjectToEntity( 4, 'school', 'Школа Менеджмента'), 'Добавлены Школа Менеджмента');
	  });	
	  it("добавит школы", function() {
	  	var lection = new Lection();
	   	assert.equal(lection.addObjectToEntity( [2, 3], 'school', 'Школа Мобильного Дизайна, Школа Разработки Интерфейсов, Школа Разработки Интерфейсов, Школа Дизайна веб-сайтов, Школа Дизайна веб-сайтов, Школа Мобильного Дизайна'), 'Добавлены Школа Мобильного Дизайна,Школа Разработки Интерфейсов,Школа Дизайна веб-сайтов');
	  });
	  it("добавит лекторов", function() {
	  	var lection = new Lection();
	   	assert.equal(lection.addObjectToEntity( [2, 3], 'lector', 'Алексей Афанасьев, Виктор Сухов'), 'Добавлены Алексей Афанасьев,Виктор Сухов');
	  });
	  it("не добавит дубли", function() {
	  	var lection = new Lection();
	   	assert.equal(lection.addObjectToEntity( [2, 3], 'lector', 'Роман Дмитриев, Роман Дмитриев, Алексей Афанасьев'), 'Добавлены Роман Дмитриев,Алексей Афанасьев');
	  });
	});
	describe("Изменение массива элементов", function() {
	  it("изменить школы", function() {
	  	var lection = new Lection();
	   	assert.equal(lection.changeEntityObject( [2, 3], 'school', 'Школа Мобильного Дизайна, Школа Разработки Интерфейсов', 'Школа Интернет-Маркетинга, Школа Анализа Данных'), "Школа Интернет-Маркетинга,Школа Анализа Данных,Школа Дизайна веб-сайтов" );
	  });
	  it("попытка изменить массивы разной длины вернет ошибку", function() {
	  	var lection = new Lection();
	   	assert.throws(function () {lection.changeEntityObject( [2, 3], 'school', 'Школа Мобильного Дизайна, Школа Разработки Интерфейсов', 'Школа Интернет-Маркетинга, Школа Анализа Данных, Лекции для школьников')}, Error);
	  });
	  it("изменить одну школу", function() {
	  	var lection = new Lection();
	    assert.equal(lection.changeEntityObject( 2, 'school', 'Школа Дизайна веб-сайтов', 'Школа Управления Проектами'), "Школа Интернет-Маркетинга,Школа Анализа Данных,Школа Управления Проектами" );
	  });	
	  it("нельзя изменить несуществующую школу", function() {
	  	var lection = new Lection();
	   	assert.throws(function () {lection.changeEntityObject( 1, 'school', 'Школа Мобильного Дизайна', 'Школа Интернет-Маркетинга')}, Error);
	  });	
	});
	describe("Удаление массива элементов", function() {
	  it("Удалить из массива все элементы", function() {
	  	var lection = new Lection();
	    assert.equal(lection.deleteEntityObject( 2, 'school', 0), "Массив school сейчас пустой." );
	  });	
	  it("Удалить из массива выбранные элементы", function() {
	  	var lection = new Lection();
	    assert.equal(lection.deleteEntityObject( 3, 'school', 'Школа Дизайна веб-сайтов'), "Остались элементы: Школа Интернет-Маркетинга, Школа Анализа Данных" );
	  });
	  it("нельзя удалить несуществующую школу", function() {
	  	var lection = new Lection();
	   	assert.throws(function () {lection.deleteEntityObject( 1, 'school', 'Школа Мобильного Дизайна')}, Error);
	  });
	  it("нельзя удалить время", function() {
	  	var lection = new Lection();
	   	assert.throws(function () {lection.deleteEntityObject( 1, 'time', 0)}, Error);
	  });
	  it("нельзя удалить имя", function() {
	  	var lection = new Lection();
	   	assert.throws(function () {lection.deleteEntityObject( 1, 'name', 0)}, Error);
	  });
	  it("удалить объект можно только у одной лекции", function() {
	  	var lection = new Lection();
	   	assert.throws(function () {lection.deleteEntityObject( [1, 2], 'school', 0)}, Error);
	  });
	});	
	describe("Изменение названия", function() {
	  it("изменит название", function() {
	  	var lection = new Lection();
	   	assert.equal( lection.editName( 2, "Мобильная лекция для начинающих"), 'Мобильная лекция для начинающих' );
	  });
	  it("Возвратит ошибку 'Вы не ввели имя при отсутствии аргумента'", function() {
	  	var lection = new Lection();
	   	 assert.throws(function () { lection.editName( 2 ) }, Error );
	  });
	  it("Возвратит ошибку 'Вы не ввели имя при втором аругменте === undefined", function() {
	  	var lection = new Lection();
	   	 assert.throws(function () { lection.editName( 2, k ) }, Error );
	  });
	  it("Возвратит ошибку 'Вы не ввели имя при второй аргумент === пустой строке", function() {
	  	var lection = new Lection();
	   	 assert.throws(function () { lection.editName( 2, '' ) }, Error );
	  });
	  it("Возвратит ошибку 'Имя нужно указать в виде строки'", function() {
	  	var lection = new Lection();
	   	 assert.throws(function () { lection.editName( 2, 123 ) }, Error );
	  });
	});
	describe("Добавление времени", function() {
	  it("Попросит ввести школу, если школ нет", function() {
	  	var lection = new Lection();
	   	assert.throws(function () { lection.setDate( 2, "24.04.2017") }, Error );
	  });	
	  it("Нельзя ввести пустую строку", function() {
	  	var lection = new Lection();
	   	assert.throws(function () { lection.setDate( 2, "") }, Error );
	  });
	  it("Нельзя ввести неправильный формат", function() {
	  	var lection = new Lection();
	   	assert.throws(function () { lection.setDate( 2, "1994/04/2") }, Error );
	  });
	  it("Добавит время к лекции", function() {
	  	var lection = new Lection();
	   assert.equal(  lection.setDate( 4, "24.04.2017"), "24 апреля 2017 (понедельник)" );
	  });
	  it("Нельзя установить время, если у школы в этот день уже есть лекция", function() {
	  	var lection = new Lection();
	  	lection.addObjectToEntity( 3, 'school', 'Школа Менеджмента');
	   	assert.throws(function () { lection.setDate( 3, "24.04.2017")}, Error );
	  });	
	  it("Нельзя заменить на школу, время которой совпадает с другой лекцией этой школы", function() {
	  	var lection = new Lection();
	  	lection.addObjectToEntity( 2, 'school', 'Школа Продвижения сайтов');
	  	lection.setDate( 2, "24.04.2017");
	   	assert.throws(function () { lection.changeEntityObject( 2, 'school', 'Школа Продвижения сайтов', 'Школа Менеджмента')}, Error );
	  });
	  it("Нельзя добавить школу, время у которой совпадает с другой лекцией этой школы", function() {
	  	var lection = new Lection();
	   	assert.throws(function () { lection.addObjectToEntity( 2, 'school', 'Школа Менеджмента')}, Error );
	  });
	  it("Нельзя установить время, если у лектора в этот день уже есть лекция", function() {
	  	var lection = new Lection();
	  	lection.addObjectToEntity( 3, 'lector', 'Виктор Сухов');
	   	assert.throws(function () { lection.setDate( 3, "24.04.2017")}, Error );
	  });	
	  it("Нельзя заменить на лектора, если время совпадает с другой лекцией этой лектора", function() {
	  	var lection = new Lection();
	   	assert.throws(function () { lection.changeEntityObject( 4, 'lector', 'Школа Менеджмента', 'Виктор Сухов')}, Error );
	  });
	  it("Нельзя добавить лектора, если время совпадает с другой лекцией этого лектора", function() {
	  	var lection = new Lection();
	   	assert.throws(function () { lection.addObjectToEntity( 4, 'lector', 'Виктор Сухов')}, Error );
	  });
	});
 
  });
});
describe("Школы", function() {
  describe("constructor", function() {
	  describe("Задать количество", function() {
		  it("Задаст количество человек в школе", function() {
		  	var school = new School();
		    assert.equal(school.setCount(1, 30), "Количество человек в школе: 30" );
		  });
		  it("Нельзя задать пустое значение", function() {
		  	var school = new School();
		   	assert.throws(function () { school.setCount()}, Error );
		  });
	  });
  	  describe("Задать новое имя", function() {
		  it("Нельзя задать пустое значение === undefined", function() {
		  	var school = new School();
		   	assert.throws(function () { school.editName()}, Error );
		  });
		  it("Нельзя задать пустое значение === '' ", function() {
		  	var school = new School();
		   	assert.throws(function () { school.editName('')}, Error );
		  });
		  it("Задаст новое имя лекции", function() {
		  	var school = new School();
		    assert.equal(school.editName(2, "Школа Фронтенда"), "Новое название: Школа Фронтенда" );
		  });
		  it("Нельзя назвать неуникально", function() {
		  	var school = new School();
		    assert.throws(function () {school.editName(3, "Школа Фронтенда")}, Error );
		  });
		  it("После переименования изменятся школы у лекций", function() {
		  	var lection = new Lection();
		    assert.equal(lection.getEntity(4)[0].school[0], "Школа Фронтенда" );
		  });
  	  })
	  describe("Вывести лекции школы", function() {
		  it("Вывести лекции одной школы", function() {
		  	var school = new School();
		  	var lection = new Lection();
		   	assert.equal( school.getLections(2)[0].id, 3 );
		  });
		  it("Вывести лекции нескольких школ", function() {
		  	var school = new School();
		   	assert.equal( school.getLections(3, 4)[0].id, 3 );
		  });
		  it("Не выведет без id", function() {
		  	var school = new School();
		   assert.throws(function () {school.getLections()}, Error );;
		  });	
		  // it("Выведет ошибку, если ничего не найдено", function() {
		  // 	var school = new School();
		  //  assert.throws(function () {school.getLections(1)}, Error );;
		  // });		  	  	
	  });
	  describe("Вывести расписание школ", function() {
		  it("Вывести лекции нескольких школ", function() {
		  	var school = new School();
		   	assert.equal( school.showShedule(1,4,5).length, 3 );
		  });
		  it("Вывести лекции одной школы", function() {
		  	var school = new School();
		   	assert.equal( school.showShedule(2).length, 2 );
		  });
	  });
	  describe("Вывести расписание школ в интервал дат", function() {
		  it("Вывести лекции нескольких школ", function() {
		  	var school = new School();
		   	assert.equal( school.filterSheduleByDate([1,4,5], "12.01.2017", "24.04.2017")[1].showdate, '24 апреля 2017 (понедельник)' );
		  });
		  it("Вывести лекции одной школы", function() {
		  	var school = new School();
		   	assert.equal( school.filterSheduleByDate([2], "12.01.2017", "24.04.2017")[0].showdate, "24 апреля 2017 (понедельник)" );
		  });
		  it("Выдаст ошибки, если ввести без дат", function() {
		  	var school = new School();
		   assert.throws(function () {chool.filterSheduleByDate([2])}, Error );;
		  });	  	
	  });
  });
});
describe("Школы", function() {
  describe("constructor", function() {
	  describe("Задать кабинет", function() {
		  it("Выдаст ошибки, если ввести без имени", function() {
		  	var school = new School();
		   	assert.throws(function () {cabinet.setEntity()}, Error );;
		  });		  	
	  });
	  describe("Задать количество", function() {
		  it("Задаст количество человек в школе", function() {
		  	//var cabinet = new Cabinet();
		    assert.equal(cabinet.setCapacity(3, 100), "Количество мест в аудитории: 100" );
		  });
		  it("Нельзя задать пустое значение", function() {
		  	var cabinet = new Cabinet();
		   	assert.throws(function () { cabinet.setCapacity()}, Error );
		  });
	  });
  	  describe("Задать новое имя", function() {
		  it("Нельзя задать пустое значение === undefined", function() {
		  	var cabinet = new Cabinet();
		   	assert.throws(function () { cabinet.editName()}, Error );
		  });
		  it("Нельзя задать пустое значение === '' ", function() {
		  	var cabinet = new Cabinet();
		   	assert.throws(function () { cabinet.editName('')}, Error );
		  });
		  it("Задаст новое имя лекции", function() {
		  	var cabinet = new Cabinet();
		    assert.equal(cabinet.editName(1, "Голубая аудитория"), "Голубая аудитория" );
		  });
		  it("Нельзя назвать неуникально", function() {
		  	var cabinet = new Cabinet();
		    assert.throws(function () {cabinet.editName(1, "розовая аудитория")}, Error );
		  });
  	  })
  	  describe("Задать адрес", function() {
		  it("Задаст новый адрес", function() {
		  	var cabinet = new Cabinet();
		    assert.equal(cabinet.setAddress(1, { classroom: 404 }), "Адрес аудитории: ул. Льва Толстого, 16, кабинет 404" );
		  });
		  it("Нельзя задать такой же кабинет", function() {
		  	var cabinet = new Cabinet();
		    assert.throws(function () {cabinet.setAddress(2, { classroom: 404 }) }, Error );
		  });
  	  });   	
  });
});
});