import { createContext, useContext, useEffect, useState } from "react";

interface WindowSizeProps {
    width: number | undefined;
    height: number | undefined;
}

interface WindowSizeContextProps {
    children: any;
}

const WindowSizeContext = createContext<WindowSizeProps>({} as WindowSizeProps);

const WindowSizeContextProvider = ({ children }: WindowSizeContextProps) => {
    const context = useWindowSize();
    return (
        <WindowSizeContext.Provider value={context}>
            {children}
        </WindowSizeContext.Provider>
    );
};

const GetWindowSize = () => {
    return useContext(WindowSizeContext);
};

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<WindowSizeProps>({
        width: undefined,
        height: undefined,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    return windowSize;
};

export { WindowSizeContextProvider, GetWindowSize };
