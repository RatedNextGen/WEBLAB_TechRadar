import {Response} from "express";

export const handleErrorResponse = (res: Response, error: any) => {
  res.status(400).json({message: error.message});
};

export const handleDeleteResponse = (res: Response, deletedItem: any) => {
  if (!deletedItem) {
    return handleItemNotFoundResponse(res)
  }
  res.status(204).send();
};

export const handleItemNotFoundResponse = (res: Response) => {
  return res.status(404).json({message: "Item not found"});
}

export const throwDuplicationError = (technology: any) => {
  throw new Error(`Technology with name "${technology.name}" already exists in category "${technology.category}".`);
}
