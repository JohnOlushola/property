"use strict";

const Env = use("Env");
const Helpers = use("Helpers");

const Url = require("url-parse");
const CLEARDB_DATABASE_URL = new Url(Env.get("CLEARDB_DATABASE_URL"));
const isProduction = Env.get("NODE_ENV") === "production";

const DB_HOST =
  Env.get("DB_HOST", isProduction && CLEARDB_DATABASE_URL.hostname) ||
  "127.0.0.1";

const DB_PORT =
  Env.get("DB_PORT", isProduction && CLEARDB_DATABASE_URL.hostname) || "3306";

const DB_USER =
  Env.get("DB_USER", isProduction && CLEARDB_DATABASE_URL.hostname) || "root";

const DB_PASSWORD =
  Env.get("DB_USER", isProduction && CLEARDB_DATABASE_URL.hostname) || "root";

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get("DB_CONNECTION", "mysql"),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be good choice under development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: "sqlite3",
    connection: {
      filename: Helpers.databasePath(
        Env.get("DB_FILENAME", "development.sqlite")
      ),
    },
    useNullAsDefault: true,
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  mysql: {
    client: "mysql",
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: "property",
    },
  },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: "pg",
    connection: {
      host: Env.get("DB_HOST", "localhost"),
      port: Env.get("DB_PORT", ""),
      user: Env.get("DB_USER", "root"),
      password: Env.get("DB_PASSWORD", ""),
      database: Env.get("DB_DATABASE", "adonis"),
    },
  },
};
