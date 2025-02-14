export enum TechnologyCategory {
  Techniques = "Techniques",
  Platforms = "Platforms",
  Tools = "Tools",
  LanguagesAndFrameworks = "Languages & Frameworks",
}

export enum TechnologyMaturity {
  Assess = "Assess",
  Trial = "Trial",
  Adopt = "Adopt",
  Hold = "Hold",
}

export interface TechnologyDTO {
  _id?: string;
  name: string;
  category: TechnologyCategory;
  maturity: TechnologyMaturity;
  description: string;
  publishedAt: Date | null;
  published: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
