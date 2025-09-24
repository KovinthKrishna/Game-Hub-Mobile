import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
  Unsubscribe,
} from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

interface FavoritesContextValue {
  favoriteIds: Set<number>;
  loading: boolean;
  isFavorite: (gameId: number) => boolean;
  toggleFavorite: (gameId: number) => Promise<void>;
  addFavorite: (gameId: number) => Promise<void>;
  removeFavorite: (gameId: number) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextValue>(
  {} as FavoritesContextValue
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const db = getFirestore();

  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let unsubscribe: Unsubscribe | undefined;

    if (user) {
      const colRef = collection(db, "users", user.uid, "favorites");
      unsubscribe = onSnapshot(
        colRef,
        (snap) => {
          const ids = new Set<number>();
          snap.forEach((d) => {
            const n = Number(d.id);
            if (!Number.isNaN(n)) ids.add(n);
          });
          setFavoriteIds(ids);
          setLoading(false);
        },
        () => {
          // On error, keep current state but stop loading
          setLoading(false);
        }
      );
    } else {
      // No user: clear favorites
      setFavoriteIds(new Set());
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [db, user]);

  const isFavorite = useCallback(
    (gameId: number) => favoriteIds.has(gameId),
    [favoriteIds]
  );

  const addFavorite = useCallback(
    async (gameId: number) => {
      if (!user) return;
      const ref = doc(db, "users", user.uid, "favorites", String(gameId));
      await setDoc(ref, {});
    },
    [db, user]
  );

  const removeFavorite = useCallback(
    async (gameId: number) => {
      if (!user) return;
      const ref = doc(db, "users", user.uid, "favorites", String(gameId));
      await deleteDoc(ref);
    },
    [db, user]
  );

  const toggleFavorite = useCallback(
    async (gameId: number) => {
      if (isFavorite(gameId)) await removeFavorite(gameId);
      else await addFavorite(gameId);
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  const value = useMemo(
    () => ({
      favoriteIds,
      loading,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
    }),
    [
      favoriteIds,
      loading,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
    ]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};
