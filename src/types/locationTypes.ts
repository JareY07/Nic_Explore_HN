export interface Location {
  id: number;
  name: string;
  distance: string;
  temperature: string;
  description: string;
  rating: number;
  saved: boolean;
  image: string;
}

export interface LocationCardsProps {
  locations: Location[];
  loading?: boolean;
  onSaveToggle?: (id: number, saved: boolean) => void;
}

export interface TopLocation {
  id: number;
  image: string;
  name: string;
  location: string; // Ubicación (ej: "Matagalpa", "Rivas", etc.)
  rating?: number; // Opcional por si quieres mostrar el rating
  saved?: boolean; // Opcional para el estado de favorito
}

export interface TopLocationCardsProps {
  locations: TopLocation[];
  loading?: boolean;
  onSaveToggle?: (id: number, saved: boolean) => void;
}
