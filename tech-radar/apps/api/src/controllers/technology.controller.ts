import {Request, Response} from "express";
import {TechnologyService} from "../services/technology.service";
import {MongoTechnologyRepository} from "../repositories/mongoTechnologyRepository";
import {handleDeleteResponse, handleErrorResponse, handleItemNotFoundResponse} from "../utils/errorHandler";

export class TechnologyController {
  technologyService = new TechnologyService(new MongoTechnologyRepository());

  async getAllPublished(req: Request, res: Response) {
    // TODO add authorization
    const userRole = "user"
    // @ts-ignore
    if (userRole === "admin") {
      return res.json(await this.technologyService.getAllForAdmin());
    } else {
      return res.json(await this.technologyService.getAllForUsers());
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const technology = await this.technologyService.getById(req.params.id);
      if (!technology) {
        return handleItemNotFoundResponse(res);
      }
      return res.json(technology);
    } catch (error: any) {
      console.error(error)
      handleErrorResponse(res, {message: "Failed retrieve user"});
    }
  }

  async create(req: Request, res: Response) {
    try {
      const technology = await this.technologyService.create(req.body);
      res.status(201).json(technology);
    } catch (error: any) {
      console.error(error)
      handleErrorResponse(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const technology = await this.technologyService.update(req.params.id, req.body);
      res.json(technology);
    } catch (error: any) {
      console.error(error)
      handleErrorResponse(res, {message: "Failed to update user"});
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deletedItem = await this.technologyService.delete(req.params.id);
      handleDeleteResponse(res, deletedItem);
    } catch (error: any) {
      console.log(error.message);
      handleErrorResponse(res, {message: "Failed to delete user"});
    }
  }
}
