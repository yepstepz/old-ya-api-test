describe("Lection", function() {
  describe("constructor", function() {
  	describe("Удаление элемента", function() {
	  it("удалит лекцию c указанным id", function() {
	  	var lection = new Lection();
	    assert.equal(lection.deleteEntity(1)[0].id, 1 );
	  });
	  it("выдает ошибку при попытке удалить повторно", function() {
	  	var lection = new Lection();
	    assert.throws(function () { lection.deleteEntity(1)[0].id }, Error);
	  });
  	});
	describe("Добавление элемента", function() {
	  it("добавит школы", function() {
	  	var lection = new Lection();
	   	assert.equal(lection.addObjectToEntity( [2, 3], 'school', 'shmd, shri, shri, lolz, lolz, shmd'), 'Добавлены shmd,shri,lolz');
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
	describe("Изменение элемента", function() {
	  it("изменить школы", function() {
	  	var lection = new Lection();
	   	assert.equal(lection.changeEntityObject( [2, 3], 'school', 'shmd, shri', 'shmd2, shri2'), 'Добавлены shmd,shri,lolz');
	  });		
	});	
	  describe("Изменение название", function() {
		  it("изменит название", function() {
		  	var lection = new Lection();
		   	assert.equal( lection.editName( 2, "Мобильная лекция для начинающих"), 'Мобильная лекция для начинающих' );
		  });
		  it("Возвратит ошибку 'Вы не ввели имя'", function() {
		  	var lection = new Lection();
		   	 assert.throws(function () { lection.editName( 2 ) }, Error );
		  });
		  it("Возвратит ошибку 'Вы не ввели имя'", function() {
		  	var lection = new Lection();
		   	 assert.throws(function () { lection.editName( 2, k ) }, Error );
		  });
		  it("Возвратит ошибку 'Вы не ввели имя'", function() {
		  	var lection = new Lection();
		   	 assert.throws(function () { lection.editName( 2, '' ) }, Error );
		  });
		  it("Возвратит ошибку 'Имя нужно указать в виде строки'", function() {
		  	var lection = new Lection();
		   	 assert.throws(function () { lection.editName( 2, 123 ) }, Error );
		  });
	  });
 
  });
});