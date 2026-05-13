module.exports = {
  apps: [
    {
      name: 'gavangtv-api',
      script: 'server/index.ts',
      interpreter: 'node_modules/.bin/tsx',
      cwd: '/home/ubuntu/gavangtv',
      env: {
        NODE_ENV: 'production',
        PORT: 4847,
        DATABASE_URL: 'postgresql://postgres:test1234@localhost:5432/gavangtv',
        JWT_SECRET: 'gavangtv-admin-secret-2026-xK9mP2vL',
        ADMIN_USERNAME: 'admin',
        ADMIN_PASSWORD: 'Admin123@',
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
      error_file: '/home/ubuntu/gavangtv/logs/error.log',
      out_file: '/home/ubuntu/gavangtv/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
