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

export const demoProjects: Project[] = [
  { id: -1, title: "DHA Peshawar Plots", city: "Peshawar", category: "Residential Plots", price: 6500000, downPaymentPercent: 20, installmentMonths: 36, description: "A planned residential opportunity with secure surroundings and convenient city access.", imageUrl: "/lmar-hero.jpg", videoUrl: "", brochureUrl: "/lmar-brochure.html", locationUrl: "https://maps.google.com/?q=DHA+Peshawar", constructionProgress: 68, status: "active", tag: "Popular" },
  { id: -2, title: "Islamabad Heights", city: "Islamabad", category: "Apartments", price: 9500000, downPaymentPercent: 25, installmentMonths: 48, description: "Modern apartment living designed for families, rental income and long-term value.", imageUrl: "/project-emaar.jpg", videoUrl: "", brochureUrl: "/lmar-brochure.html", locationUrl: "https://maps.google.com/?q=Islamabad", constructionProgress: 82, status: "active", tag: "High demand" },
  { id: -3, title: "LMAR Business Square", city: "Peshawar", category: "Commercial", price: 12000000, downPaymentPercent: 30, installmentMonths: 36, description: "A commercial opportunity for offices, retail and growing businesses in a connected location.", imageUrl: "/lmar-hero.jpg", videoUrl: "", brochureUrl: "/lmar-brochure.html", locationUrl: "https://maps.google.com/?q=Peshawar", constructionProgress: 54, status: "active", tag: "Investment" },
];

export const money = (value: number) => new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(value);
