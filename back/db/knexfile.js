
module.exports = {
    client: 'postgresql',
    connection:{
        database: 'portifolio',
        user: 'postgres', 
        password: '00312001Di'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};