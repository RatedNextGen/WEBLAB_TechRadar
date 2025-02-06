import { Request, Response } from "express";
import { TechnologyService } from "../services/technology.service";
import { MongoTechnologyRepository } from "../repositories/technology/mongoTechnologyRepository";
import { handleDeleteResponse, handleErrorResponse, handleItemNotFoundResponse } from "../utils/errorHandler";
import logger from "../utils/logger";

export class TechnologyController {
  technologyService = new TechnologyService(new MongoTechnologyRepository());

  async getAllPublished(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userRole = req.user?.role;

      if (["CTO", "Tech-Lead"].includes(userRole)) {
        return res.json(await this.technologyService.getAllForAdmin());
      } else {
        return res.json(await this.technologyService.getAllForUsers());
      }
    } catch (error: any) {
      logger.error(error);
      handleErrorResponse(res, error);
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
      logger.error(error);
      handleErrorResponse(res, { message: "Failed to retrieve technology" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const technology = await this.technologyService.create(req.body);
      res.status(201).json(technology);
    } catch (error: any) {
      logger.error(error);
      handleErrorResponse(res, error);
    }
  }

  async createDraft(req: Request, res: Response) {
    try {
      const technology = await this.technologyService.createDraft(req.body);
      res.status(201).json(technology);
    } catch (error: any) {
      logger.error(error);
      handleErrorResponse(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const technology = await this.technologyService.update(req.params.id, req.body);
      res.json(technology);
    } catch (error: any) {
      logger.error(error);
      handleErrorResponse(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deletedItem = await this.technologyService.delete(req.params.id);
      handleDeleteResponse(res, deletedItem);
    } catch (error: any) {
      logger.error(error);
      handleErrorResponse(res, { message: "Failed to delete technology" });
    }
  }
}
