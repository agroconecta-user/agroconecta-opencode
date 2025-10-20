const { default: mongoose } = require('mongoose');

const solutions = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Sistema de Irrigação Inteligente",
    category: "machinery",
    subcategory: "irrigation",
    details: "Sistema automatizado de irrigação que utiliza sensores de umidade e temperatura para otimizar o uso de água na agricultura.",
    priceDollar: 2500,
    link: "https://example.com/irrigation-system",
    publishDate: new Date("2024-01-15"),
    starRating: 4.5,
    ownerContact: {
      email: "contato@agrotech.com",
      phone: "(11) 99999-8888",
      other: "WhatsApp: (11) 99999-8888"
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Consultoria em Agricultura Sustentável",
    category: "service",
    subcategory: "consulting",
    details: "Serviço de consultoria especializada em técnicas de agricultura sustentável e orgânica.",
    priceDollar: 150,
    link: "https://example.com/consulting",
    publishDate: new Date("2024-01-20"),
    starRating: 4.8,
    ownerContact: {
      email: "consultoria@agroverde.com",
      phone: "(21) 88888-7777"
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Estudo sobre Eficiência de Fertilizantes",
    category: "scientific_article",
    subcategory: "research",
    details: "Pesquisa sobre a eficiência de diferentes tipos de fertilizantes em culturas de milho e soja.",
    link: "https://example.com/research",
    publishDate: new Date("2024-01-10"),
    starRating: 4.2,
    ownerContact: {
      email: "pesquisa@universidade.edu.br"
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Trator com GPS Integrado",
    category: "machinery",
    subcategory: "tractors",
    details: "Trator equipado com sistema GPS para navegação precisa e otimização de rotas no campo.",
    priceDollar: 85000,
    link: "https://example.com/tractor",
    publishDate: new Date("2024-01-25"),
    starRating: 4.7,
    ownerContact: {
      email: "vendas@maquinaria.com",
      phone: "(31) 77777-6666"
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Software de Gestão Agrícola",
    category: "product",
    subcategory: "software",
    details: "Software completo para gestão de fazendas, incluindo controle de estoque, planejamento de plantio e análise de produtividade.",
    priceDollar: 299,
    link: "https://example.com/agro-software",
    publishDate: new Date("2024-01-30"),
    starRating: 4.6,
    ownerContact: {
      email: "suporte@agrosoft.com",
      phone: "(41) 66666-5555"
    }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Fertilizante Orgânico Premium",
    category: "product",
    subcategory: "inputs",
    details: "Fertilizante orgânico de alta qualidade, produzido com ingredientes naturais e certificado para agricultura orgânica.",
    priceDollar: 45,
    link: "https://example.com/organic-fertilizer",
    publishDate: new Date("2024-02-01"),
    starRating: 4.9
    // ← SEM ownerContact - deve aparecer "via plataforma"
  }
];

module.exports = {
  solutions,
  async up(db, client) {
    await db.collection('solutions').insertMany(solutions);
  },
  async down(db, client) {
    await db.collection('solutions').deleteMany({
      _id: { $in: solutions.map(solution => solution._id) }
    });
  }
}; 