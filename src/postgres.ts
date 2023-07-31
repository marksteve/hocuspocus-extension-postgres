import { Database, DatabaseConfiguration } from '@hocuspocus/extension-database'
import postgres from 'postgres'

export const schema = `
  CREATE TABLE IF NOT EXISTS "documents" (
    "name" varchar(255) PRIMARY KEY,
    "data" bytea NOT NULL
  )
`

export interface PostgresConfiguration extends DatabaseConfiguration {
  connectionString: string
  schema: string
}

export class Postgres extends Database {
  sql?: postgres.Sql

  configuration: PostgresConfiguration = {
    connectionString: '',
    schema,
    fetch: async ({ documentName }) => {
      const [row] = await this.sql!`
        SELECT data FROM "documents" WHERE name = ${documentName}
      `
      return row?.data
    },
    store: async ({ documentName, state }) => {
      return await this.sql!`
        INSERT INTO "documents" ("name", "data") VALUES (${documentName}, ${state})
          ON CONFLICT(name) DO UPDATE SET data = ${state}
      `
    },
  }

  constructor(configuration?: Partial<PostgresConfiguration>) {
    super({})

    this.configuration = {
      ...this.configuration,
      ...configuration,
    }
  }

  async onConfigure() {
    this.sql = postgres(this.configuration.connectionString)
    await this.sql.unsafe(this.configuration.schema)
  }
}
