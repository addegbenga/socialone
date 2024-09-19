import { ContentType } from "./util";

export interface Thread {
    id: string;
    content: string;
    images: { img: string; rawFile: File }[];
  }
  export interface ThreadComponentProps {
    thread: Thread;
    index: number;
    maxChars: number;
    updateThreadOnMaxChar: (newContent: string) => void;
    updateThread: (newContent: string) => void;
    addThread: () => void;
    removeThread: () => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    deleteImage: (imageIndex: number) => void;
    setSelectedImage: (image: string | null) => void;
    setIsImageModalOpen: (isOpen: boolean) => void;
  }
  
  export interface ThreadedMarkdownProps {
    contentType: keyof typeof ContentType;
    maxChars?: number;
  }