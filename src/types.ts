export interface Photo {
  id: string;
  title: string;
  category: string;
  url: string;
  description: string;
}

export type Category = "All" | "Weddings" | "Official Events" | "Convocation";
