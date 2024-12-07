export class Products {
  constructor(
    public productName: string,
    public price: number,
    public category: string,
    public isSold: boolean
  ) {}
}

const firstProduct = new Products("Hand Bag", 45, "Bags", false);
const secondProduct = new Products("Jordan 1", 80, "Shoes/Sneakers", true);
const thirdProduct = new Products("T Shirt", 30, "Tops", false);
const lastProduct = new Products("Round Neck", 90, "Tops", true);

export const allProducts: Products[] = [
  firstProduct,
  secondProduct,
  thirdProduct,
  lastProduct,
];
