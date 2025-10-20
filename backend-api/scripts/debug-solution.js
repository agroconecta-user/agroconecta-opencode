const mongoose = require('mongoose');

async function debugSolution() {
  try {
    // Conectar ao MongoDB
    const mongoUri = process.env.MONGO_HOST || 'mongodb://localhost:27017/agroconecta';
    await mongoose.connect(mongoUri);
    console.log('✅ Conectado ao MongoDB');

    // Buscar a collection de soluções
    const solutionsCollection = mongoose.connection.db.collection('solutions');
    
    // Buscar todas as soluções
    const allSolutions = await solutionsCollection.find({}).toArray();
    console.log('\n📋 Todas as soluções no banco:');
    allSolutions.forEach((solution, index) => {
      console.log(`\n--- Solução ${index + 1} ---`);
      console.log('ID:', solution._id);
      console.log('Title:', solution.title);
      console.log('Category:', solution.category);
      console.log('Details:', solution.details || 'NÃO TEM DETAILS!');
      console.log('Price:', solution.priceDollar);
      console.log('Link:', solution.link);
      console.log('Star Rating:', solution.starRating);
      console.log('Owner Contact:', solution.ownerContact);
      console.log('Publish Date:', solution.publishDate);
      console.log('Created At:', solution.createdAt);
    });

    // Verificar se há soluções sem details
    const solutionsWithoutDetails = allSolutions.filter(s => !s.details);
    console.log(`\n⚠️  Soluções SEM details: ${solutionsWithoutDetails.length}`);
    solutionsWithoutDetails.forEach(s => {
      console.log(`- ${s.title} (ID: ${s._id})`);
    });

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado do MongoDB');
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  debugSolution();
}

module.exports = { debugSolution }; 