export interface card {
  Name: string;
  Img: string;
  Category: string;
  Price: number;
  Quantity: number;
  Id: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Index: number;
}

export interface filterObj {
  Name: string;
  Value: boolean;
}
