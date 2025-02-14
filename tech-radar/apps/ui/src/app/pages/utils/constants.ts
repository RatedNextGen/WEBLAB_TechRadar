import { TechnologyCategory, TechnologyMaturity } from '../../../../../../shared/src/lib/models/technology.model';

export const baseUrl = 'http://localhost:8080/api';

export const maturityOrder = [
  TechnologyMaturity.Adopt,
  TechnologyMaturity.Assess,
  TechnologyMaturity.Hold,
  TechnologyMaturity.Trial
];
export const categoryOrder = [
  TechnologyCategory.Techniques,
  TechnologyCategory.Platforms,
  TechnologyCategory.Tools,
  TechnologyCategory.LanguagesAndFrameworks
];
