import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    "type": "sqlite",
    "database": "src/database/database.sqlite",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true,
    "migrations":["dist/database/migrations/*.{.ts.js}"],
    "extra": {
        "connectionLimit": 1,
    }
}

export const dataSource = new DataSource(dataSourceOptions)

dataSource.initialize()
    .then(() => {
        // Configurar PRAGMA após a inicialização do DataSource
        return dataSource.query('PRAGMA busy_timeout = 60000');
    })
    .then(() => {
        console.log('PRAGMA busy_timeout set to 60000');
    })
    .catch((err) => {
        console.error('Error initializing Data Source or setting PRAGMA busy_timeout', err);
    })