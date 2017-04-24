/*
*Пример работы
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
