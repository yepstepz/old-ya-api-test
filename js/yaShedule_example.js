/*
*Пример работы.
*/
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
lection.deleteEntity(1);
lection.addObjectToEntity( 4, 'school', 'Школа Менеджмента');
lection.addObjectToEntity( [2, 3], 'school', 'Школа Мобильного Дизайна, Школа Разработки Интерфейсов, Школа Разработки Интерфейсов, Школа Дизайна веб-сайтов, Школа Дизайна веб-сайтов, Школа Мобильного Дизайна');
lection.addObjectToEntity( [2, 3], 'lector', 'Алексей Афанасьев, Виктор Сухов');
lection.changeEntityObject( [2, 3], 'school', 'Школа Мобильного Дизайна, Школа Разработки Интерфейсов', 'Школа Интернет-Маркетинга, Школа Анализа Данных');
lection.changeEntityObject( 2, 'school', 'Школа Дизайна веб-сайтов', 'Школа Управления Проектами');
lection.deleteEntityObject( 2, 'school', 0);
lection.editName( 2, "Мобильная лекция для начинающих");
lection.setDate( 4, "24.04.2017");
school.setCount(1, 30);
school.editName(2, "Школа Фронтенда");
school.getLections(2);
school.showShedule(1,4,5);
school.showShedule(2);
school.filterSheduleByDate([1,4,5], "12.01.2017", "24.04.2017");
school.filterSheduleByDate("all", "12.01.2017", "24.04.2017");
cabinet.setCapacity(3, 100);
cabinet.setAddress(1, { classroom: 404 });
cabinet.setLections(2, [2,4]);
cabinet.setLections(2, [3]);
cabinet.showShedule(2);
cabinet.getEntity(); // 4 кабинета.
school.getEntity(); // 5 школ
lection.getEntity(); // 7 лекций