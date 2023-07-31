# hocuspocus-extension-postgres

a generic [Hocuspocus](https://tiptap.dev/hocuspocus/introduction) persistence driver for postgres

## Usage

```js
import { Logger } from '@hocuspocus/extension-logger'
import { Server } from '@hocuspocus/server'
import { Postgres } from 'hocuspocus-extension-postgres'

const port = process.env.PORT ?? 1234

const server = Server.configure({
  port,
  extensions: [
    new Logger(),
    new Postgres({
      connectionString: 'postgres://postgres@localhost:5432/postgres',
    }),
  ],
})

server.listen()
```

## License

[MIT License](https://marksteve.mit-license.org/)
