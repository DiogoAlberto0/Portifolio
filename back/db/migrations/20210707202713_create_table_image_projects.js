
exports.up = function(knex) {
    return knex.schema.createTable('imgprojects', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('size').notNull()
        table.string('key').unique().notNull()
        table.string('url').unique().notNull()
        table.integer('projectId').notNull().references('id').inTable('projects')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('imgprojects')
};
