
exports.up = function(knex) {
    return knex.schema.createTable('homepage', (table) => {
        table.increments('id').primary()
        table.string('text', 500).notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('homepage')
};
