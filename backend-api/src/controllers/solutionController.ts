import {
  CreateSolutionRequest,
  GetSolutionsRequest,
  SolutionApiDto,
} from 'routes/solution/solution.types';
import { ISolution, SolutionModel } from 'models/solution';
/**
 * Creates a new solution.
 * @param {Partial<ISolution>} solutionData - The solution data.
 * @returns {Promise<ISolution>} The created solution.
 */
export const createSolution = async (solutionData: CreateSolutionRequest, token: string): Promise<ISolution> => {
  // Verifica se o token de administrador é válido
  const NODE_ENV = process.env.NODE_ENV === 'development';
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  if (!ADMIN_TOKEN) {
    throw new Error('Token de administrador não configurado no ambiente');
  }
  if (token !== ADMIN_TOKEN && !NODE_ENV) {
    throw new Error('Token de autorização inválido');
  }
  try {
    // Mapear description para details no banco
    const dataToSave = {
      ...solutionData,
      details: solutionData.description, // Mapear description para details
      subcategory: solutionData.subcategory,
    };
    delete (dataToSave as Record<string, unknown>).description; // Remover description do objeto
    
          // Limpar campos vazios do ownerContact
      if (dataToSave.ownerContact) {
        const cleanedContact: Record<string, string> = {};
      
      if (dataToSave.ownerContact.email && dataToSave.ownerContact.email.trim() !== '') {
        cleanedContact.email = dataToSave.ownerContact.email.trim();
      }
      
      if (dataToSave.ownerContact.phone && dataToSave.ownerContact.phone.trim() !== '') {
        cleanedContact.phone = dataToSave.ownerContact.phone.trim();
      }
      
      if (dataToSave.ownerContact.other && dataToSave.ownerContact.other.trim() !== '') {
        cleanedContact.other = dataToSave.ownerContact.other.trim();
      }
      
      // Só incluir ownerContact se tiver pelo menos um campo preenchido
      if (Object.keys(cleanedContact).length > 0) {
        dataToSave.ownerContact = cleanedContact;
      } else {
        delete dataToSave.ownerContact;
      }
    }
    
    const newSolution = new SolutionModel(dataToSave);
    await newSolution.save();
    
    return newSolution;
  } catch (error) {
    throw new Error(`Erro ao criar solução: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
};

/**
 * Retrieves all solutions, optionally filtered by category and subcategory.
 * @param {GetSolutionsRequest} query - The query parameters, potentially including category and subcategory.
 * @returns {Promise<SolutionApiDto[]>} The list of solutions.
 */
export const getSolutions = async (query: GetSolutionsRequest): Promise<SolutionApiDto[]> => {
  try {
    // Extrai as strings category e subcategory do objeto query recebido
    const categoryString = query && query.category ? query.category : undefined;
    const subcategoryString = query && query.subcategory ? query.subcategory : undefined;

  // Cria o filtro Mongoose com suporte a categoria e subcategoria
  const filter: Partial<Record<'category' | 'subcategory', string>> = {};
    
    if (categoryString && categoryString.trim() !== '') {
      filter.category = categoryString;
    }
    
    if (subcategoryString && subcategoryString.trim() !== '') {
      filter.subcategory = subcategoryString;
    }

    const solutions = await SolutionModel.find(filter);

    return solutions.map((solution: ISolution) => {
      const solutionObject = solution.toObject();
      return {
        id: solutionObject._id.toString(),
        title: solution.title,
        category: solution.category,
        subcategory: solution.subcategory,
        description: solution.details,
        priceDollar: solution.priceDollar,
        link: solution.link,
        publishDate: solution.publishDate.toISOString(),
        dataColeta: solution.dataColeta,
        starRating: solution.starRating,
        ownerContact: solution.ownerContact,
        createdAt: solution.createdAt ? solution.createdAt.toISOString() : undefined,
        updatedAt: solution.updatedAt ? solution.updatedAt.toISOString() : undefined,
      };
    });
  } catch (error) {
    throw new Error(`Erro ao buscar soluções: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
};


/**
 * Retrieves a single solution by ID.
 * @param {string} _id - The solution ID.
 * @returns {Promise<SolutionApiDto | null>} The solution or null if not found.
 */
export const getSolutionById = async (_id: string): Promise<SolutionApiDto | null> => {
  try {
    const solution = await SolutionModel.findById(_id);
    if (!solution) {
      return null;
    }
    const solutionObject = solution.toObject();
    return {
      id: solutionObject._id.toString(),
      title: solution.title,
      category: solution.category,
      subcategory: solution.subcategory,
      description: solution.details,
      priceDollar: solution.priceDollar,
      link: solution.link,
      publishDate: solution.publishDate.toISOString(),
      dataColeta: solution.dataColeta,
      starRating: solution.starRating,
      ownerContact: solution.ownerContact,
      createdAt: solution.createdAt ? solution.createdAt.toISOString() : undefined,
      updatedAt: solution.updatedAt ? solution.updatedAt.toISOString() : undefined,
    };
  } catch (error) {
    throw new Error(`Erro ao buscar solução por ID: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
};

/**
 * Deletes a solution by ID.
 * @param {string} _id - The solution ID.
 * @returns {Promise<ISolution | null>} The deleted solution or null if not found.
 */
export const deleteSolution = async (_id: string, token: string): Promise<ISolution | null> => {

  const NODE_ENV = process.env.NODE_ENV === 'development';
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
  if (!ADMIN_TOKEN) {
    throw new Error('Token de administrador não configurado no ambiente');
  }
  if (token !== ADMIN_TOKEN && !NODE_ENV) {
    throw new Error('Token de autorização inválido');
  }
  try {
    const deletedSolution = await SolutionModel.findByIdAndDelete(_id);
    if (!deletedSolution) {
      throw new Error('Solução não encontrada');
    }
    return deletedSolution;
  } catch (error) {
    throw new Error(`Erro ao deletar solução: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
};
