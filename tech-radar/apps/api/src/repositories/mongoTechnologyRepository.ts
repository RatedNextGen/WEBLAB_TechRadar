import { TechnologyModel } from "../config/database";
import { TechnologyRepository } from "./technology.repository.interface";
import {TechnologyDTO} from "../../../../shared/src/lib/models/technology.model";
import {throwDuplicationError} from "../utils/errorHandler";


const DUPLICATE_ENTRY = 11000;
export class MongoTechnologyRepository implements TechnologyRepository{
  async getAllForAdmin(): Promise<TechnologyDTO[]> {
    return TechnologyModel.find();
  }

  async getAllForUsers(): Promise<TechnologyDTO[]> {
    const todayISO = new Date().toISOString().split("T")[0];

    return TechnologyModel.find({
      $expr: {
        $lte: [{ $dateToString: { format: "%Y-%m-%d", date: "$publishedAt" } }, todayISO]
      }
    });
  }

  async getById(id: string): Promise<TechnologyDTO> {
    return TechnologyModel.findById(id);
  }

  async create(technology: any): Promise<any> {
    try {
      return await TechnologyModel.create(technology);
    } catch (error: any) {
      if (error.code === DUPLICATE_ENTRY) {
        throw new Error(`Technology with name "${technology.name}" already exists in category "${technology.category}".`);
      }
      throw error;
    }
  }

  async update(id: string, technology: any) {
    const existingTechAndName = await TechnologyModel.findOne({
      name: technology.name,
      category: technology.category,
      _id: { $ne: id }
    });
    if (existingTechAndName){
      throwDuplicationError(technology);
    }
    return TechnologyModel.findByIdAndUpdate(id, technology, { new: true });
  }

  async delete(id: string) {
    return TechnologyModel.findByIdAndDelete(id);
  }
}
