import {MongoTechnologyRepository} from "../repositories/mongoTechnologyRepository";
import {
  TechnologyCategory,
  TechnologyDTO,
  TechnologyMaturity
} from "../../../../shared/src/lib/models/technology.model";
import {ValidationError} from "../utils/validationError";

export class TechnologyService {
  constructor(private technologyRepository: MongoTechnologyRepository) {}

  async getAllForAdmin(): Promise<any[]> {
    return this.technologyRepository.getAllForAdmin();
  }

  async getAllForUsers(): Promise<any[]> {
    return this.technologyRepository.getAllForUsers();
  }

  async getById(id: string): Promise<any> {
    return this.technologyRepository.getById(id);
  }

  async create(technology: TechnologyDTO): Promise<any> {
    this.validateEnums(technology);
    return this.technologyRepository.create(technology);
  }

  async update(id: string, technology: Omit<TechnologyDTO, "id">): Promise<any> {
    this.validateEnums(technology);
    return this.technologyRepository.update(id, technology);
  }

  async delete(id: string): Promise<any> {
    return this.technologyRepository.delete(id);
  }

  private validateEnums(technology: any) {
    if (technology.category && !Object.values(TechnologyCategory).includes(technology.category)) {
      throw new ValidationError(`Invalid category: "${technology.category}". Allowed values: ${Object.values(TechnologyCategory).join(", ")}`);
    }

    if (technology.maturity && technology.maturity !== null && !Object.values(TechnologyMaturity).includes(technology.maturity)) {
      throw new ValidationError(`Invalid maturity: "${technology.maturity}". Allowed values: ${Object.values(TechnologyMaturity).join(", ")}`);
    }
  }
}
