const mongoose = require('mongoose');

// Dados de teste
const testSolution = {
  title: "Teste de Sistema de Irrigação",
  category: "machinery",
  subcategory: "irrigation",
  description: "Este é um teste para verificar se os detalhes e subcategorias estão sendo salvos corretamente no banco de dados.",
  priceDollar: 1500,
  link: "https://example.com/test",
  publishDate: new Date().toISOString(),
  starRating: 4.5
};

async function testSolutionCreation() {
  try {
    // Conectar ao MongoDB
    const mongoUri = process.env.MONGO_HOST || 'mongodb://localhost:27017/agroconecta';
    await mongoose.connect(mongoUri);
    console.log('✅ Conectado ao MongoDB');

    // Buscar a collection de soluções
    const solutionsCollection = mongoose.connection.db.collection('solutions');
    
    // Inserir dados de teste
    const result = await solutionsCollection.insertOne(testSolution);
    console.log('✅ Solução inserida com ID:', result.insertedId);

    // Buscar a solução inserida
    const savedSolution = await solutionsCollection.findOne({ _id: result.insertedId });
    console.log('\n📋 Solução salva no banco:');
    console.log(JSON.stringify(savedSolution, null, 2));

    // Verificar se os campos estão corretos
    console.log('\n🔍 Verificações:');
    console.log('✅ Title:', savedSolution.title === testSolution.title);
    console.log('✅ Category:', savedSolution.category === testSolution.category);
    console.log('✅ Subcategory:', savedSolution.subcategory === testSolution.subcategory);
    console.log('✅ Details:', savedSolution.details === testSolution.description);
    console.log('✅ Price:', savedSolution.priceDollar === testSolution.priceDollar);
    console.log('✅ Link:', savedSolution.link === testSolution.link);
    console.log('✅ Star Rating:', savedSolution.starRating === testSolution.starRating);
    console.log('✅ Owner Contact:', !savedSolution.ownerContact ? '✅ SEM CONTATO (via plataforma)' : '❌ TEM CONTATO');

    // Limpar dados de teste
    await solutionsCollection.deleteOne({ _id: result.insertedId });
    console.log('\n🧹 Dados de teste removidos');

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado do MongoDB');
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  testSolutionCreation();
}

module.exports = { testSolutionCreation }; 