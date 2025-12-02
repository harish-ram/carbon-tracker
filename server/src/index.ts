/**
 * Smart Carbon Footprint Backend Server
 * 
 * To use the backend server:
 * 1. Navigate to the server directory: cd server
 * 2. Install dependencies: npm install
 * 3. Set up your .env file with DATABASE_URL
 * 4. Run migrations: npm run prisma:migrate
 * 5. Start the server: npm run dev
 */

export const serverConfig = {
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '',
};
