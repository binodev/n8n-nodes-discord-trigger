const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create a temporary directory for modified definition files
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Execute TypeScript compilation with skipLibCheck
try {
  console.log('Compiling with skipLibCheck...');
  execSync('npx tsc --skipLibCheck', { stdio: 'inherit' });
  console.log('Compilation successful!');
} catch (error) {
  console.error('Compilation error:', error.message);
  process.exit(1);
} 