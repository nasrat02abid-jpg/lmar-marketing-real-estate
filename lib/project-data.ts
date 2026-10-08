export type Project = {
  id: number;
  title: string;
  city: string;
  category: string;
  price: number;
  downPaymentPercent: number;
  installmentMonths: number;
  description: string;
  imageUrl: string;
  videoUrl: string;
  brochureUrl: string;
  locationUrl: string;
  constructionProgress: number;
  status: string;
  tag?: string;
};

export const money = (value: number) => new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(value);
