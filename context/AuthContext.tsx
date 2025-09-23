import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  User,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebaseConfig";

interface AuthContextValue {
  user: User | null;
  userDetails: UserDetails | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateProfileDetails: (firstName: string, lastName: string) => Promise<void>;
  changeEmail: (newEmail: string, currentPassword: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
}

const db = getFirestore();

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const currentUserDetails = await getDoc(
          doc(db, "users", currentUser.uid)
        );

        if (currentUserDetails.exists()) {
          setUserDetails(currentUserDetails.data() as UserDetails);
        }
      } else {
        setUserDetails(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstName: firstName,
      lastName: lastName,
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateProfileDetails = async (firstName: string, lastName: string) => {
    if (!user) throw new Error("No authenticated user");
    await setDoc(
      doc(db, "users", user.uid),
      {
        firstName,
        lastName,
      },
      { merge: true }
    );
    setUserDetails((prev) => {
      if (!prev) return null;
      return { ...prev, firstName, lastName };
    });
  };

  const changeEmail = async (newEmail: string, currentPassword: string) => {
    if (!user || !user.email) throw new Error("No authenticated user");
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, newEmail);
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    if (!user || !user.email) throw new Error("No authenticated user");
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userDetails,
        loading,
        login,
        register,
        logout,
        updateProfileDetails,
        changeEmail,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
