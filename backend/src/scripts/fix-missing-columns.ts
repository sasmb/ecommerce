import { DataSource } from "typeorm";
import { ConfigModule } from "@medusajs/utils";
import path from "path";

/**
 * This script adds missing columns to the database
 * Run with: npx ts-node src/scripts/fix-missing-columns.ts
 */
async function fixMissingColumns() {
  console.log("Starting database column fix...");

  // Load configuration
  ConfigModule.load(path.resolve("."), { cwd: path.resolve(".") });
  
  // Get database connection details from Medusa config
  const { projectConfig } = ConfigModule.getConfig();
  const databaseUrl = process.env.DATABASE_URL || projectConfig.database_url;
  
  if (!databaseUrl) {
    console.error("No database URL found in config");
    process.exit(1);
  }

  // Create a DataSource instance
  const dataSource = new DataSource({
    type: "postgres",
    url: databaseUrl,
    synchronize: false,
  });

  try {
    // Initialize the connection
    await dataSource.initialize();
    console.log("Database connection established");

    // Check if the is_giftcard column exists
    const hasColumn = await dataSource.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'product' AND column_name = 'is_giftcard'`
    );

    if (hasColumn.length === 0) {
      console.log("Adding missing column is_giftcard to product table...");
      
      // Add the missing column
      await dataSource.query(
        `ALTER TABLE product ADD COLUMN IF NOT EXISTS is_giftcard BOOLEAN DEFAULT FALSE`
      );
      
      console.log("Column added successfully!");
    } else {
      console.log("Column is_giftcard already exists in product table.");
    }

    // Close the connection
    await dataSource.destroy();
    console.log("Database fix completed!");
  } catch (error) {
    console.error("Error fixing database:", error);
    process.exit(1);
  }
}

// Run the fix
fixMissingColumns()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  }); 