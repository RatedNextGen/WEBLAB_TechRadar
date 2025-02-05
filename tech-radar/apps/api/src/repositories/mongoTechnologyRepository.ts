import {TechnologyModel} from "../config/database";
import {TechnologyRepository} from "./technology.repository.interface";
import {TechnologyDTO} from "../../../../shared/src/lib/models/technology.model";
import {throwDuplicationError} from "../utils/errorHandler";
import {ValidationError} from "../utils/validationError";


const DUPLICATE_ENTRY = 11000;

export class MongoTechnologyRepository implements TechnologyRepository {
  async getAllForAdmin(): Promise<TechnologyDTO[]> {
    return TechnologyModel.find();
  }

  async getAllForUsers(): Promise<TechnologyDTO[]> {
    return TechnologyModel.find({published: true});
  }

  async getById(id: string): Promise<TechnologyDTO> {
    return TechnologyModel.findById(id);
  }

  async create(technology: TechnologyDTO): Promise<any> {
    try {
      this.validateTechnology(technology);

      return await TechnologyModel.create({
        ...technology,
        publishedAt: technology.published ? new Date() : null
      });
    } catch (error: any) {
      this.handleMongoError(error, technology);
    }
  }

  async update(id: string, technology: any) {
    try {
      this.validateTechnology(technology);

      const existingTechAndName = await TechnologyModel.findOne({
        name: technology.name,
        category: technology.category,
        _id: {$ne: id}
      });
      if (existingTechAndName) {
        throwDuplicationError(technology);
      }

      const updateData = {
        ...technology,
        publishedAt: technology.publishedAt ?? (technology.published ? new Date() : null)
      };

      return TechnologyModel.findByIdAndUpdate(id, updateData, {new: true});
    } catch (error: any) {
      this.handleMongoError(error, technology);
    }
  }

  private validateTechnology(technology: TechnologyDTO) {
    if (technology.published && (!technology.description || !technology.maturity)) {
      throw new ValidationError("Description and maturity are required when publishing a technology.");
    }
  }

  private handleMongoError(error: any, technology: TechnologyDTO): never {
    if (error.code === DUPLICATE_ENTRY) {
      throwDuplicationError(technology);
    }
    throw error;
  }

  async delete(id: string) {
    return TechnologyModel.findByIdAndDelete(id);
  }
}
