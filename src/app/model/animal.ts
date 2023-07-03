import {Tag} from "./tag";
import {Category} from "./category";

export interface Animal{
  id: number;
  name: string;
  category: Category;
  tags: Tag[];
  imageData: any;
}
