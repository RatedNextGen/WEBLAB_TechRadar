import {TechnologyDTO} from "../../../../../shared/src/lib/models/technology.model";

export interface TechnologyRepository {
  getAllForAdmin(): Promise<TechnologyDTO[]>;
  getAllForUsers(): Promise<TechnologyDTO[]>;
  getById(id: string): Promise<any>;
  create(technology: TechnologyDTO): Promise<any>;
  update(id: string, technology: TechnologyDTO): Promise<any>;
  delete(id: string): Promise<any>;
}
