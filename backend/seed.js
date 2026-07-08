// Simple seed to create demo user and shoes
const bcrypt = require('bcrypt');
const sequelize = require('./config/database');
const User = require('./models/user');
const Shoe = require('./models/shoe');

async function seed() {
  await sequelize.sync({ force: true });
  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await User.create({ name: 'Demo User', email: 'demo@example.com', passwordHash });
  await Shoe.bulkCreate([
    { name: 'Runner Pro', brand: 'FastFeet', size: 9, price: 89.99, description: 'Lightweight running shoe', stock: 12 },
    { name: 'Trail Blazer', brand: 'RockStep', size: 10, price: 129.99, description: 'Rugged trail shoe', stock: 6 },
    { name: 'Everyday Sneak', brand: 'Street', size: 8, price: 59.99, description: 'Comfortable everyday wear', stock: 20 }
  ]);
  console.log('Seed complete. Demo user: demo@example.com / password123');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
