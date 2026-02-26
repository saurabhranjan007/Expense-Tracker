const app = require('./src/app');
const db = require('./src/db/database');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    
    // Initialize database
    await db.initialize();
    console.log('Database initialized');

    db.seedDefaultCategories();

    // Start server
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ API Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);

    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');

  // #region agent log
  fetch('http://127.0.0.1:7349/ingest/4e306227-4563-4b7b-b462-031e9940786b', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': '65727c',
    },
    body: JSON.stringify({
      sessionId: '65727c',
      runId: 'initial',
      hypothesisId: 'H3',
      location: 'server.js:process.on(SIGINT)',
      message: 'SIGINT handler invoked',
      data: {},
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion agent log

  await db.close();
  process.exit(0);
});

