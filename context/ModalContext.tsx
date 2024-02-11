"use client";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

type ModalContextType = {
  content: React.ReactNode;
  setContent: (content: React.ReactNode) => void;
};

export const ModalContext = createContext<ModalContextType>({
  content: null,
  setContent: () => {},
});

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [content, setContent] = useState<React.ReactNode>(null);

  return (
    <ModalContext.Provider value={{ content, setContent }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const { setContent, content } = useContext(ModalContext);
  return { setContent, content };
};
