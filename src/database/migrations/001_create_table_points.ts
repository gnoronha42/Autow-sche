import Knex from 'knex';

export async function up(knex: Knex) {
    return await knex.schema.createTable('points', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('image').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('price').notNullable();
        table.decimal('longitude').notNullable();
        table.decimal('latitude').notNullable();
        table.string('uf', 2).notNullable();
        table.string('city').notNullable();
        
    });
};

export async function down(knex: Knex) {
    return await knex.schema.dropTable('points');
};
 