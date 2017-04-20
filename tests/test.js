describe("Lection", function() {
  describe("constructor", function() {
	  it("удалит лекцию c указанным id", function() {
	  	var lection = new Lection();
	    assert.equal(lection.deleteEntity(1)[0].id, 1);
	  });
	  it("выдает ошибку при попытке удалить повторно", function() {
	  	var lection = new Lection();
	    assert.throws(function () { lection.deleteEntity(1)[0].id }, Error);
	  });
	  it("добавит классы", function() {
	  	var lection = new Lection();
	   	assert.equal(lection.addObjectToEntity( lection.getEntity(1,3,4), 'school', 'shmd, shri, shri, lolz, lolz, shmd'), 'Добавлены shmd,shri,lolz');
	  });
	  it("добавит классы", function() {
	  	var lection = new Lection();
	   	assert.equal(lection.addObjectToEntity( lection.getEntity(2,4), 'lector', 'Алексей Тяпкин'), 'Добавлены Алексей Тяпкин');
	  });
	  it("изменит название", function() {
	  	var lection = new Lection();
	   	assert.equal(lection.editEntity( 2, {
	   				 name: "Мобильная лекция для начинающих"
	   	}).name, 'Мобильная лекция для начинающих');
	  });
 
  });
});