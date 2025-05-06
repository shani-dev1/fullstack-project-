export interface CompetitionItem {
  _id:string
  category: string;
  score: number;
  file: string;
  ownerId: Number;
  ownerEmail: string;
}

export interface Category {
  pictures: string;
  recipes: string; 
  exams: string;
}
export type CategoryKeys = keyof Category;
