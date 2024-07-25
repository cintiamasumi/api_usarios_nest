import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    "type": "sqlite",
    "database": "src/database/database.sqlite",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true,
    "migrations":["dist/database/migrations/*.{.ts.js}"]
}

export const dataSource = new DataSource(dataSourceOptions)

dataSource.initialize()
    .then(() => {
        console.log('Data Source initialize')
    }
    ).catch ((err) => {
        console.error('Error initialize Data Source', err)
    })

