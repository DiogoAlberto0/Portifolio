
exports.up = function(knex) {
    return knex.schema.createTable('projects', table => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
        table.integer('userId').notNull().references('id').inTable('users')
        table.string('programingLanguage').notNull()
        table.string('repositoryLink').unique()
        table.string('link').unique()
        table.string('thumbLink').unique()
        table.string('obs', 1000)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('projects')
};
