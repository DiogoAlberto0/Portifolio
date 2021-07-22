
exports.up = function(knex) {
    return knex.schema.createTable('contactus', table => {
        table.increments('id').primary()
        table.string('name', 200).notNull()
        table.string('email', 100).notNull()
        table.string('subject', 1000).notNull()
        table.boolean('seen').defaultTo(false)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('contactus')
};
