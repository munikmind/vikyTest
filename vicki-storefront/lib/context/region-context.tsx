import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { sdk } from '../sdk';

type RegionContextType = {
  regionId: string | null;
  setRegionId: (id: string) => void;
};

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [regionId, setRegionId] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer la région par défaut au chargement
    async function fetchDefaultRegion() {
      try {
        const { regions } = await sdk.store.region.list();
        if (regions.length > 0) {
          console.log("Region id:", regions[0])
          setRegionId(regions[0].id);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la région:", error);
      }
    }

    if (!regionId) {
      fetchDefaultRegion();
    }
  }, []);

  return (
    <RegionContext.Provider value={{ regionId, setRegionId }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
}
