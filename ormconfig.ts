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
          
          dataSource.query('PRAGMA busy_timeout = 60000')
          .then(() => {
              console.log('PRAGMA busy_timeout set to 60000');
          })
          .catch((err) => {
              console.error('Error setting PRAGMA busy_timeout', err);
          });
        console.log('Data Source initialize')
    }
    ).catch ((err) => {
        console.error('Error initialize Data Source', err)
    })

