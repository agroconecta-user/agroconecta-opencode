const mongoose = require('mongoose');
const { solutions } = require('../mongo/seed-data/solutions-seed');

async function seedSolutions() {
  try {
    // Conectar ao MongoDB
    const mongoUri = process.env.MONGO_HOST || 'mongodb://localhost:27017/agroconecta';
    await mongoose.connect(mongoUri);
    console.log('Conectado ao MongoDB');

    // Limpar dados existentes
    await mongoose.connection.db.collection('solutions').deleteMany({});
    console.log('Dados existentes removidos');

    // Inserir novos dados
    await mongoose.connection.db.collection('solutions').insertMany(solutions);
    console.log('Dados de seed inseridos com sucesso');

    // Listar os dados inseridos
    const insertedSolutions = await mongoose.connection.db.collection('solutions').find({}).toArray();
    console.log('Soluções inseridas:', insertedSolutions.length);
    insertedSolutions.forEach(solution => {
      console.log(`- ${solution.title} (ID: ${solution._id})`);
    });

  } catch (error) {
    console.error('Erro ao executar seed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB');
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  seedSolutions();
}

module.exports = { seedSolutions }; 