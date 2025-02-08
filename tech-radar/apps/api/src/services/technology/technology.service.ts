import {MongoTechnologyRepository} from "../../repositories/technology/mongoTechnologyRepository";
import {
  TechnologyCategory,
  TechnologyDTO,
  TechnologyMaturity
} from "../../../../../shared/src/lib/models/technology.model";
import {ValidationError} from "../../utils/validationError";
import {throwDuplicationError} from "../../utils/errorHandler";

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
    this.validateTechnology(technology);
    return this.technologyRepository.create({
      ...technology,
      published: true,
      publishedAt: new Date()
    });
  }

  async createDraft(technology: TechnologyDTO): Promise<any> {
    this.validateTechnology(technology);
    return this.technologyRepository.create({
      ...technology,
      published: false,
      publishedAt: null
    });
  }

  async update(id: string, technology: Partial<TechnologyDTO>): Promise<any> {
    const existingTechnology = await this.technologyRepository.getById(id);
    if (!existingTechnology?.published) {
      throw new ValidationError("Cannot update an unpublished draft using update(). Use updateDraft() instead.");
    }

    this.validateTechnology(technology);

    const existingTechAndName = await this.technologyRepository.findByNameAndCategory(
      technology.name,
      technology.category,
      id
    );
    if (existingTechAndName) {
      throwDuplicationError(technology);
    }

    return this.technologyRepository.update(id, { ...technology });
  }

  async updateDraft(id: string, technology: Partial<TechnologyDTO>): Promise<any> {
    const existingTechnology = await this.technologyRepository.getById(id);
    if (existingTechnology?.published) {
      throw new ValidationError("Cannot update a published technology using updateDraft. Use update instead.");
    }

    this.validateTechnology(technology);

    return this.technologyRepository.update(id, {
      ...technology,
      published: false,
      publishedAt: null
    });
  }


  async delete(id: string): Promise<any> {
    return this.technologyRepository.delete(id);
  }

  private validateTechnology(technology: Partial<TechnologyDTO>) {
    if (technology.published && (!technology.description || !technology.maturity)) {
      throw new ValidationError("Description and maturity are required when publishing a technology.");
    }

    if (technology.category && !Object.values(TechnologyCategory).includes(technology.category)) {
      throw new ValidationError(`Invalid category: "${technology.category}". Allowed values: ${Object.values(TechnologyCategory).join(", ")}`);
    }

    if (technology.maturity && !Object.values(TechnologyMaturity).includes(technology.maturity)) {
      throw new ValidationError(`Invalid maturity: "${technology.maturity}". Allowed values: ${Object.values(TechnologyMaturity).join(", ")}`);
    }
  }
}
