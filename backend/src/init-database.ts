import sql from 'mssql';

export async function initDatabase(): Promise<void> {
  const config: sql.config = {
    server: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 1433),
    user: process.env.DB_USERNAME || 'sa',
    password: process.env.DB_PASSWORD || 'YourStrong!Passw0rd',
    options: {
      enableArithAbort: true,
      trustServerCertificate: true,
    },
  };

  try {
    const pool = await sql.connect(config);
    const dbName = process.env.DB_DATABASE || 'expensesdb';
    
    // Check if database exists
    const result = await pool.request().query(`
      SELECT name FROM sys.databases WHERE name = '${dbName}'
    `);

    if (result.recordset.length === 0) {
      console.log(`Creating database ${dbName}...`);
      await pool.request().query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }

    await pool.close();
  } catch (error) {
    console.error('Error initializing database:', error);
    // Don't throw - let TypeORM handle connection errors
  }
}

