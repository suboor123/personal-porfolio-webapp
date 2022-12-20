export type CardProps = {
    heading: string;
    imageUrl: string;
    description: string;
    date?: string;
    views: number;
    tags?: string[];
    isActive?: boolean;
    currentlyViewing?: boolean
  };