
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();        //cria uma chave primaria
  
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
     
        table.string('ong_id').notNullable();
  
        table.foreign('ong_id').references('id').inTable('ongs'); //chave do banco
    });
  };
  
  exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
  };