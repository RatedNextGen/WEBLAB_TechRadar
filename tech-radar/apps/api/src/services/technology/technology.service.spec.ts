import {TechnologyService} from "./technology.service";
import {MongoTechnologyRepository} from "../../repositories/technology/mongoTechnologyRepository";
import {
  TechnologyDTO,
  TechnologyCategory,
  TechnologyMaturity
} from "../../../../../shared/src/lib/models/technology.model";
import {ValidationError} from "../../utils/validationError";

const mockRepository = {
  getAllForAdmin: jest.fn(),
  getAllForUsers: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  createDraft: jest.fn(),
  findByNameAndCategory: jest.fn(),
  update: jest.fn(),
  updateDraft: jest.fn(),
  updateDraftAndPublish: jest.fn(),
  delete: jest.fn(),
};

describe("TechnologyService", () => {
  let technologyService: TechnologyService;

  beforeEach(() => {
    technologyService = new TechnologyService(mockRepository as unknown as MongoTechnologyRepository);
    jest.clearAllMocks();
  });

  it("should return all technologies for admin", async () => {
    const mockData = [
      {name: "React", published: false},
      {name: "Node.js", published: true}
    ];

    mockRepository.getAllForAdmin.mockResolvedValue(mockData);

    const result = await technologyService.getAllForAdmin();
    expect(result).toEqual(mockData);
    expect(mockRepository.getAllForAdmin).toHaveBeenCalledTimes(1);
  });

  it("should return published technologies for user", async () => {
    const mockData = [
      {name: "Node.js", published: true}
    ];

    mockRepository.getAllForUsers.mockResolvedValue(mockData);

    const result = await technologyService.getAllForUsers();
    expect(result).toEqual(mockData);
    expect(mockRepository.getAllForUsers).toHaveBeenCalledTimes(1);
  });

  it("should create a published technology", async () => {
    const technology: TechnologyDTO = {
      name: "React",
      category: TechnologyCategory.LanguagesAndFrameworks,
      description: "Frontend library",
      maturity: TechnologyMaturity.Adopt,
      published: true,
      publishedAt: new Date(),
    };

    mockRepository.create.mockResolvedValue(technology);

    const result = await technologyService.create(technology);

    expect(result).toEqual(technology);
    expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      name: "React",
      published: true,
    }));
  });

  it("should create a draft technology", async () => {
    const draft: TechnologyDTO = {
      name: "Draft Tech",
      category: TechnologyCategory.Techniques,
      description: "",
      maturity: null,
      published: false,
      publishedAt: null,
    };

    mockRepository.create.mockResolvedValue(draft);

    const result = await technologyService.createDraft(draft);

    expect(result).toEqual(draft);
    expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      name: "Draft Tech",
      published: false,
    }));
  });

  it("should throw ValidationError when publishing without description or maturity", async () => {
    const invalidTech: TechnologyDTO = {
      name: "Invalid Tech",
      category: TechnologyCategory.Platforms,
      description: "",
      maturity: null,
      published: true,
      publishedAt: new Date(),
    };

    await expect(technologyService.create(invalidTech)).rejects.toThrow(ValidationError);
  });

  it("should throw ValidationError for invalid category", async () => {
    const invalidTech: TechnologyDTO = {
      name: "Invalid Category Tech",
      category: "InvalidCategory" as TechnologyCategory,
      description: "Test",
      maturity: TechnologyMaturity.Trial,
      published: false,
      publishedAt: null,
    };

    await expect(technologyService.createDraft(invalidTech)).rejects.toThrow(ValidationError);
  });

  it("should update a technology without duplication error", async () => {
    const updatedTech = {
      name: "Updated Tech",
      category: TechnologyCategory.Platforms,
      description: "Updated description",
      maturity: TechnologyMaturity.Trial,
      published: true,
    };

    mockRepository.findByNameAndCategory.mockResolvedValue(null);
    mockRepository.update.mockResolvedValue(updatedTech);

    const result = await technologyService.updateDraft("123", updatedTech);

    expect(result).toEqual(updatedTech);
    expect(mockRepository.update).toHaveBeenCalledTimes(1);
  });

  it("should update a draft technology", async () => {
    const draftUpdate = {
      name: "Updated Draft",
      category: TechnologyCategory.Tools,
      description: "Draft update",
      published: false,
    };

    mockRepository.getById.mockResolvedValue({ published: false });
    mockRepository.update.mockResolvedValue(draftUpdate);

    const result = await technologyService.updateDraft("456", draftUpdate);

    expect(result).toEqual(draftUpdate);
    expect(mockRepository.update).toHaveBeenCalledWith("456", expect.objectContaining({
      name: "Updated Draft",
      published: false,
    }));
  });

  it("should update a draft technology and publish", async () => {
    const draftUpdate = {
      name: "Updated Draft and publish",
      category: TechnologyCategory.Tools,
      description: "Draft update",
      published: false,
    };

    mockRepository.getById.mockResolvedValue({ published: false });
    mockRepository.update.mockResolvedValue(draftUpdate);

    const result = await technologyService.updateDraftAndPublish("456", draftUpdate);

    expect(result).toEqual(draftUpdate);
    expect(mockRepository.update).toHaveBeenCalledWith("456", expect.objectContaining({
      name: "Updated Draft and publish",
      published: true,
    }));
  });

  it("should throw ValidationError when trying to update a published technology with updateDraft()", async () => {
    mockRepository.getById.mockResolvedValue({ published: true });

    await expect(technologyService.updateDraft("456", { name: "Invalid Draft Update" }))
      .rejects
      .toThrow(ValidationError);
  });

  it("should throw ValidationError when trying to update a draft with update function", async () => {
    mockRepository.getById.mockResolvedValue({ published: false });

    await expect(technologyService.update("123", { name: "Invalid Update" }))
      .rejects
      .toThrow(ValidationError);
  });

  it("should throw ValidationError when trying to update and publish an already published tech", async () => {
    mockRepository.getById.mockResolvedValue({ published: true });

    await expect(technologyService.updateDraftAndPublish("123", { name: "Invalid Update" }))
      .rejects
      .toThrow(ValidationError);
  });

  it("should delete a technology", async () => {
    mockRepository.delete.mockResolvedValue(true);

    const result = await technologyService.delete("123");

    expect(result).toBe(true);
    expect(mockRepository.delete).toHaveBeenCalledWith("123");
  });
});
