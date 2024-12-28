// Screen size context provider
"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the context type
interface ScreenSizeContextType {
    isMobile: boolean;
}

// Create the context
const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(undefined);

// Define the provider's props type
interface ScreenSizeProviderProps {
    children: ReactNode;
}

// Create the provider component
export const ScreenSizeProvider: React.FC<ScreenSizeProviderProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const mediaQuery = window.matchMedia("(max-width: 768px)");
            setIsMobile(mediaQuery.matches);

            const handleMediaChange = (e: MediaQueryListEvent) => {
                setIsMobile(e.matches);
            };

            mediaQuery.addEventListener("change", handleMediaChange);

            return () => mediaQuery.removeEventListener("change", handleMediaChange);
        }
    }, []);

    return (
        <ScreenSizeContext.Provider value={{ isMobile }}>
            {children}
        </ScreenSizeContext.Provider>
    );
};

// Create a custom hook to use the context
export const useScreenSize = (): ScreenSizeContextType => {
    const context = useContext(ScreenSizeContext);
    if (!context) {
        throw new Error("useScreenSize must be used within a ScreenSizeProvider");
    }
    return context;
};
