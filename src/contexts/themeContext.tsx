import React, { createContext, Dispatch, FC, useContext, useMemo, useReducer } from "react";

type Theme = "light" | "dark" | "custom";

interface ThemeState {
  currentTheme: Theme;
  primaryColor: string;
  backgroundColor: string;
}

type ThemeAction =
  | { type: "SET_THEME"; payload: Theme }
  | { type: "SET_PRIMARY_COLOR"; payload: string }
  | { type: "SET_BACKGROUND_COLOR"; payload: string };

const initialThemState: ThemeState = {
  currentTheme: "light",
  primaryColor: "#007bff",
  backgroundColor: "#ffffff",
};

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, currentTheme: action.payload };
    case "SET_PRIMARY_COLOR":
      return { ...state, primaryColor: action.payload };
    case "SET_BACKGROUND_COLOR":
      return { ...state, backgroundColor: action.payload };
    default:
      return state;
  }
};

const ThemeContext = createContext<
  | {
      state: ThemeState;
      dispatch: Dispatch<ThemeAction>;
    }
  | undefined
>(undefined);

export const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialThemState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
