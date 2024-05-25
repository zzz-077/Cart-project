export interface card {
  Name: string;
  Img: string;
  Category: string;
  Price: number;
  Quantity: number;
  Id: string;
  Index: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  SelectedQuantity: number;
}

export interface filterObj {
  Name: string;
  Value: boolean;
}
