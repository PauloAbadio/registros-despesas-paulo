import * as sql from "mssql";

export async function initDatabase(): Promise<void> {
  const config: sql.config = {
    server: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 1433),
    user: process.env.DB_USERNAME || "sa",
    password: process.env.DB_PASSWORD || "YourStrong!Passw0rd",
    database: "master",
    options: {
      encrypt: false,
      enableArithAbort: true,
      trustServerCertificate: true,
    },
  };

  try {
    const pool = await sql.connect(config);
    const dbName = process.env.DB_DATABASE || "expensesdb";

    const result = await pool.request().query(`
      SELECT name FROM sys.databases WHERE name = '${dbName}'
    `);

    if (result.recordset.length === 0) {
      console.log(`Criando database "${dbName}"...`);
      await pool.request().query(`CREATE DATABASE ${dbName}`);
      console.log(`Database "${dbName}" criada com sucesso.`);
    } else {
      console.log(`Database "${dbName}" já existe.`);
    }

    await pool.close();
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error);
  }
}
