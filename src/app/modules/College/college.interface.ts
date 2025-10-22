import { IReview } from '../MyCollege/myCollege.interface';

export interface ICollege {
  _id?: string;
  collegeName: string;
  image: string;
  rating?: number;
  admissionDate: string;
  numberOfResearch: number;
  events: string[];
  sports: string[];
  reviews?: IReview[];
}
