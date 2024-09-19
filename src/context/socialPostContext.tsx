import React, { createContext, useContext, useState, useEffect } from "react";

export const STORAGE_KEY = "socialContent";

export const ContentType = {
  TWEET: "tweet",
  INSTAGRAM: "instagram",
  LINKEDIN: "linkedin",
} as const;

export type ContentTypeKey = keyof typeof ContentType;

interface Image {
  id: string;
  img: string;
  rawFile: File;
}

interface Thread {
  id: string;
  content: string;
  images: { img: string; rawFile: File }[];
}

interface SocialPostStorage {
  // @ts-ignore
  [key in ContentTypeKey]: Thread[];
}

interface SocialPostContextType {
  posts: SocialPostStorage;
  getPosts: (contentType: ContentTypeKey) => Thread[];
  getImageById: (
    contentType: string,
    threadId: string,
    imageIndex: number
  ) => Image | undefined;
}

const SocialPostContext = createContext<SocialPostContextType | undefined>(
  undefined
);

export const useSocialPostStorage = () => {
  const context = useContext(SocialPostContext);
  if (!context) {
    throw new Error(
      "useSocialPostStorage must be used within a SocialPostProvider"
    );
  }
  return context;
};

export const SocialPostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<SocialPostStorage>(() => {
    const storedContent = localStorage.getItem(STORAGE_KEY);
    if (storedContent) {
      return JSON.parse(storedContent);
    }
    return {
      [ContentType.TWEET]: [{ id: "1", content: "", images: [] }],
      [ContentType.INSTAGRAM]: [{ id: "1", content: "", images: [] }],
      [ContentType.LINKEDIN]: [{ id: "1", content: "", images: [] }],
    };
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedContent = localStorage.getItem(STORAGE_KEY);
      if (storedContent) {
        setPosts(JSON.parse(storedContent));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const getPosts = (contentType: ContentTypeKey): Thread[] => {
    // @ts-ignore
    return posts[contentType];
  };
  const getImageById = (
    contentType: string,
    threadId: string,
    imageIndex: number
  ): Image | undefined => {
    // @ts-ignore
    const thread = posts[contentType].find((t: any) => t.id === threadId);
    if (thread) {
      return thread.images.find(
        (_: any, index: number) => index === imageIndex
      );
    }
    return undefined;
  };

  return (
    <SocialPostContext.Provider value={{ posts, getPosts, getImageById }}>
      {children}
    </SocialPostContext.Provider>
  );
};
