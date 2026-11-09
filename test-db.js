import dns from 'node:dns/promises';
import mongoose from 'mongoose';

const host = 'cluster0.jqbayof.mongodb.net';
const uri =
  'mongodb+srv://thayalanpritheeve_db_user:TjZERw43Oz7Psxi7@cluster0.jqbayof.mongodb.net/ecommerce?retryWrites=true&w=majority';

console.log('--- Step 1: Testing DNS SRV Resolution ---');
try {
  const records = await dns.resolveSrv(`_mongodb._tcp.${host}`);
  console.log('✅ DNS SRV lookup succeeded! Nodes found:');
  records.forEach((r) => console.log(`   👉 ${r.name}:${r.port}`));
} catch (err) {
  console.error('❌ DNS SRV lookup failed:', err.code || err.message);
}

console.log('\n--- Step 2: Testing Database Connection ---');
try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 6000 });
  console.log('✅ Connected to MongoDB Atlas successfully!');
  await mongoose.disconnect();
  console.log('✅ Disconnected cleanly.');
} catch (err) {
  console.error('❌ Connection failed:', err.message);
}
