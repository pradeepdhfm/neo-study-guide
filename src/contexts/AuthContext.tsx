import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface StudentDetails {
  collegeName: string;
  yearOfStudy: string;
  semester: string;
  branch: string;
}

interface AuthContextType {
  user: User | null;
  studentDetails: StudentDetails | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  saveStudentDetails: (details: StudentDetails) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate login - in production, this would call Supabase
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      id: "1",
      email,
      firstName: "Demo",
      lastName: "User",
    });
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    // Simulate signup - in production, this would call Supabase
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      id: "1",
      email,
      firstName,
      lastName,
    });
  };

  const logout = () => {
    setUser(null);
    setStudentDetails(null);
  };

  const saveStudentDetails = (details: StudentDetails) => {
    setStudentDetails(details);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        studentDetails,
        isAuthenticated: !!user,
        hasCompletedOnboarding: !!studentDetails,
        login,
        signup,
        logout,
        saveStudentDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
