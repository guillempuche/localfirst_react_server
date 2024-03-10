# Quick Guide to Setting Up PostgreSQL and ElectricSQL

## Prerequisites

Ensure you have Docker and Node.js installed. These will be used to run database services and execute command-line instructions.

## Step 1: Start Services

Run the Docker app, then this command:

```shell
yarn database:esql:start
```

This command launches both your PostgreSQL database and ElectricSQL services in Docker, making them ready for use.

## Step 2: Show Configuration

In a new terminal, run the following command:

```shell
yarn database:esql:show-config
```

Displays the current setup of your ElectricSQL environment, including connections and service details.

## Step 3: Generate and Electrify SQL Migrations

```shell
yarn database:esql:generate
```

This command uses [Drizzle ORM](https://orm.drizzle.team/docs), based on your `database/schema.ts` file, to generate SQL migration files.

After generating these files, you need to manually add ElectricSQL statements to electrify your tables. This is necessary because ElectricSQL extends PostgreSQL with custom features for data synchronization, which are not part of the standard PostgreSQL language. Adding `ENABLE ELECTRIC` to your tables makes them ready for ElectricSQL's sync services. Because these statements are specific to ElectricSQL, running them requires the proxy tunneling setup, ensuring that ElectricSQL can process and understand these custom commands.

## Step 4: Electrify Your Tables

In your generated migration file `database/migrations/**.sql`, append the following to electrify your tables:

```sql
-- After all table alterations are complete, enable Electric SQL
ALTER TABLE table_name_1 ENABLE ELECTRIC;
ALTER TABLE table_name_2 ENABLE ELECTRIC;
...
```

Replace `table_name_1`, `table_name_2`, etc., with the actual names of your tables.

## Step 5: Set Up Proxy Tunneling

In a new terminal, run the following command:

```shell
yarn database:esql:proxy-tunnel
```

Establishes a connection to the ElectricSQL proxy to allow electrifying of the Postgres tables by ElectricSQL services.

## Step 6: Migrate SQL Files

```shell
yarn database:esql:migrate
```

Executes the prepared SQL migrations, including the electrification commands, updating your database schema accordingly.

Finally, you can close the proxy tunnel terminal process we were running.

## Step 7: Visually Inspect Your PostgreSQL Database

```shell
yarn database:esql:interactive
```

This command launches Drizzle Studio, a web interface for Drizzle ORM. It allows you to visually explore and interact with your PostgreSQL database. After running electrification and migrations, Drizzle Studio makes it easy to verify the changes directly in your browser, ensuring that your tables are correctly set up for ElectricSQL synchronization.

## New

- install flyway
  - <https://neon.tech/docs/guides/flyway>
- configure flyway
  - <https://documentation.red-gate.com/flyway/flyway-cli-and-api/configuration/parameters>
  - naming sql files, undo migrations <https://documentation.red-gate.com/fd/migrations-184127470.html>
- sql files:
  - follow example
- create Powersync user to your database. I'm using Neon dashboard "Roles" to create it instead of SQL migration:

```sql
CREATE ROLE powersync_role WITH REPLICATION LOGIN PASSWORD 'xxxxx';
```

- run migrations `flyway -configFiles="/Users/.../xstate-actor/database/flyway.toml" migrate`
- Create a PowerSync account <https://powersync.journeyapps.com> and connect to Postgres database. In my case is Neon <https://docs.powersync.com/usage/installation/database-setup/neon>
- deploy syncronization rules of PowerSync. Copy `sync_rules.yaml` to your PowerSync dashboard and deploy it.

- To make the local SQLite database work, the dependencies need to be installed in node_modules in this project, not outse like Yarn PnP `<home>/.yarn/cache/...` outside this root project.
