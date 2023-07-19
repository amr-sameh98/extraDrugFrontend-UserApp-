export interface IDrugRequest {
  DonorId: string;
  RequestItems: [
      {
          UserDrugId: number;
          Quantity: number;
      }
    ]

}
