#!/usr/bin/env node

/**
 * Script untuk generate secret keys yang dibutuhkan Strapi
 * Jalankan dengan: node generate-secrets.js
 */

const crypto = require('crypto');

function generateSecret() {
  return crypto.randomBytes(32).toString('base64');
}

console.log('='.repeat(60));
console.log('STRAPI SECRET KEYS GENERATOR');
console.log('='.repeat(60));
console.log('\nGenerate secret keys untuk Strapi deployment.');
console.log('Copy dan paste values ini ke Render environment variables.\n');
console.log('='.repeat(60));

const secrets = {
  APP_KEYS: `${generateSecret()},${generateSecret()},${generateSecret()},${generateSecret()}`,
  API_TOKEN_SALT: generateSecret(),
  ADMIN_JWT_SECRET: generateSecret(),
  TRANSFER_TOKEN_SALT: generateSecret(),
  JWT_SECRET: generateSecret()
};

Object.entries(secrets).forEach(([key, value]) => {
  console.log(`\n${key}:`);
  console.log(value);
});

console.log('\n' + '='.repeat(60));
console.log('CATATAN:');
console.log('- Simpan keys ini dengan aman');
console.log('- Jangan commit keys ini ke repository');
console.log('- Gunakan keys yang berbeda untuk setiap environment');
console.log('='.repeat(60) + '\n');
