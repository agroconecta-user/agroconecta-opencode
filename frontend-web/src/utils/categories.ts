// Configuração de categorias e subcategorias do AgroConecta
export const CATEGORIES_CONFIG = {
  product: {
    label: 'Produto',
    subcategories: {
      electronic: { value: 'electronic', label: 'Eletrônico' },
      inputs: { value: 'inputs', label: 'Insumos' },
      equipment: { value: 'equipment', label: 'Equipamentos' },
      software: { value: 'software', label: 'Software' },
      tools: { value: 'tools', label: 'Ferramentas' }
    }
  },
  service: {
    label: 'Serviço',
    subcategories: {
      consulting: { value: 'consulting', label: 'Consultoria' },
      technical: { value: 'technical', label: 'Técnico' },
      educational: { value: 'educational', label: 'Educacional' },
      logistics: { value: 'logistics', label: 'Logística' },
      maintenance: { value: 'maintenance', label: 'Manutenção' }
    }
  },
  scientific_article: {
    label: 'Artigo Científico',
    subcategories: {
      research: { value: 'research', label: 'Pesquisa' },
      review: { value: 'review', label: 'Revisão' },
      technology: { value: 'technology', label: 'Tecnologia' },
      sustainability: { value: 'sustainability', label: 'Sustentabilidade' },
      innovation: { value: 'innovation', label: 'Inovação' }
    }
  },
  machinery: {
    label: 'Maquinário',
    subcategories: {
      tractors: { value: 'tractors', label: 'Tratores' },
      harvesters: { value: 'harvesters', label: 'Colheitadeiras' },
      implements: { value: 'implements', label: 'Implementos' },
      aerator: { value: 'aerator', label: 'Aerador' },
      specialized: { value: 'specialized', label: 'Especializado' }
    }
  },
  irrigation: {
    label: 'Irrigação',
    subcategories: {
      aspersores: { value: 'aspersores', label: 'Aspersores' },
      medidores: { value: 'medidores', label: 'Medidores' },
      temporizadores: { value: 'temporizadores', label: 'Temporizadores' }
    }
  },
  patents: {
    label: 'Patente',
    subcategories: {
      
    }
  }
};

// Tipos TypeScript para as categorias
export type CategoryType = keyof typeof CATEGORIES_CONFIG;
export type SubcategoryType<T extends CategoryType> = keyof typeof CATEGORIES_CONFIG[T]['subcategories'];

// Função para obter subcategorias de uma categoria
export function getSubcategories(category: CategoryType) {
  return CATEGORIES_CONFIG[category]?.subcategories || {};
}

// Função para obter label de uma categoria
export function getCategoryLabel(category: CategoryType) {
  return CATEGORIES_CONFIG[category]?.label || category;
}

// Função para obter label de uma subcategoria
export function getSubcategoryLabel(category: CategoryType, subcategory: string) {
  const categoryConfig = CATEGORIES_CONFIG[category];
  if (!categoryConfig) return subcategory;
  
  const subcategories = categoryConfig.subcategories;
  const subcategoryConfig = subcategories[subcategory as keyof typeof subcategories];
  
  // Verificação de tipo mais específica
  if (subcategoryConfig && typeof subcategoryConfig === 'object') {
    const config = subcategoryConfig as { label: string };
    return config.label;
  }
  
  return subcategory;
}
