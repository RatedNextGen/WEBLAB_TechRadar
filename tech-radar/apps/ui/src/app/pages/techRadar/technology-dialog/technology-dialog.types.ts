import { TechnologyDTO } from '../../../../../../../shared/src/lib/models/technology.model';

export enum SaveActionType {
  PUBLISH = 'save',
  DRAFT = 'draft'
}

export interface TechnologyDialogData {
  technology: TechnologyDTO;
  mode: TechnologyDialogMode;
}

export interface TechnologyDialogResult {
  action: SaveActionType,
  data: TechnologyDTO
}

export enum TechnologyDialogMode {
  CREATE = 'create',
  EDIT = 'edit',
  CHANGE_MATURITY = 'changeMaturity',
}
