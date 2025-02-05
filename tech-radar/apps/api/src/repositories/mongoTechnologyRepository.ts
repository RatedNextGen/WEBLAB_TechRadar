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

  async findByNameAndCategory(name: string, category: string, excludeId?: string): Promise<TechnologyDTO | null> {
    return TechnologyModel.findOne({
      name,
      category,
      _id: { $ne: excludeId }
    });
  }

  async create(technology: TechnologyDTO): Promise<any> {
    try {
      return await TechnologyModel.create(technology);
    } catch (error: any) {
      this.handleMongoError(error, technology);
    }
  }

  async update(id: string, technology: any) {
    try {
      return await TechnologyModel.findByIdAndUpdate(id, technology, {new: true});
    } catch (error: any) {
      this.handleMongoError(error, technology);
    }
  }

  async delete(id: string) {
    return TechnologyModel.findByIdAndDelete(id);
  }

  private handleMongoError(error: any, technology: TechnologyDTO): never {
    if (error.code === DUPLICATE_ENTRY) {
      throwDuplicationError(technology);
    }
    throw error;
  }
}
