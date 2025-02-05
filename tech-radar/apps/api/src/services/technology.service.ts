import {MongoTechnologyRepository} from "../repositories/mongoTechnologyRepository";
import {TechnologyDTO} from "../../../../shared/src/lib/models/technology.model";

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
    return this.technologyRepository.create(technology);
  }

  async update(id: string, technology: Omit<TechnologyDTO, "id">): Promise<any> {
    return this.technologyRepository.update(id, technology);
  }

  async delete(id: string): Promise<any> {
    return this.technologyRepository.delete(id);
  }
}
