"use client";

import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { MenuBar } from "./menu";
import ImageGrid from "./images/imageGrid";
import { ImageEditorModal } from "./images/editImageView";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { CircularProgress } from "@/components/ui/circularProgress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { DEFAULT_TYPE, STORAGE_KEY } from "@/services/util";
import {
  ThreadedMarkdownProps,
  Thread,
  ThreadComponentProps,
} from "@/services/thread.types";
import { supportedSocialsIcon } from "@/services/data";
import { useRouter } from "@tanstack/react-router";

const extensions = [
  Placeholder.configure({
    placeholder: "What's happening Today?!",
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

export default function ThreadedMarkdown({
  contentType = DEFAULT_TYPE as any,
  maxChars = 280,
}: ThreadedMarkdownProps) {
  const [threads, setThreads] = useState<Thread[]>(() => {
    const storedContent = localStorage.getItem(STORAGE_KEY);
    if (storedContent) {
      const parsedContent = JSON.parse(storedContent);
      return (
        parsedContent[contentType] || [{ id: "1", content: "", images: [] }]
      );
    }
    return [{ id: "1", content: "", images: [] }];
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ [contentType]: threads })
    );
  }, [threads, contentType]);

  const addThread = (index: number) => {
    const newThreads = [...threads];
    newThreads.splice(index + 1, 0, {
      id: Date.now().toString(),
      content: "",
      images: [],
    });
    setThreads(newThreads);
  };

  const updateThreadOnMaxChar = (index: number, newContent: string) => {
    let remainingContent = newContent;
    const newThreads = [...threads];

    // Update the current thread and create new threads if necessary
    for (let i = index; i < newThreads.length; i++) {
      if (remainingContent.length <= maxChars) {
        newThreads[i].content = remainingContent;
        remainingContent = "";
        break;
      } else {
        const lastSpaceIndex = remainingContent.lastIndexOf(" ", maxChars);
        const splitIndex = lastSpaceIndex > 0 ? lastSpaceIndex : maxChars;

        newThreads[i].content = remainingContent.slice(0, splitIndex).trim();
        remainingContent = remainingContent.slice(splitIndex).trim();

        if (i === newThreads.length - 1 && remainingContent.length > 0) {
          newThreads.push({
            id: Date.now().toString(),
            content: "",
            images: [],
          });
        }
      }
    }

    setThreads(newThreads);
  };

  const removeThread = (index: number) => {
    if (threads.length > 1) {
      const newThreads = threads.filter((_, i) => i !== index);
      setThreads(newThreads);
    }
  };

  const updateThread = (index: number, newContent: string) => {
    const newThreads = [...threads];
    newThreads[index].content = newContent;
    setThreads(newThreads);
  };

  const handleImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      const newImagesPromises = Array.from(files).map(
        (file) =>
          new Promise<{ img: string; rawFile: File }>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({ img: reader.result as string, rawFile: file });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );

      Promise.all(newImagesPromises).then((newImages) => {
        const newThreads = [...threads];
        newThreads[index].images = [...newThreads[index].images, ...newImages];
        setThreads(newThreads);
      });
    }
    e.target.value = "";
  };

  const deleteImage = (threadIndex: number, imageIndex: number) => {
    const newThreads = [...threads];
    newThreads[threadIndex].images.splice(imageIndex, 1);
    setThreads(newThreads);
  };

  return (
    <div className="relative">
      <div className="pb-4 grid gap-8">
        <h1 className="text-xl font-medium tracking-tight">Add Post</h1>

        <div className="flex max-w-prose items-center gap-2">
          <div className="flex gap-1">
            {supportedSocialsIcon.map((item, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="icon"
                className="w-7 h-7 flex items-center justify-center rounded-md border"
              >
                {item.icon}
              </Button>
            ))}
          </div>

          <Popover modal={false}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="w-6 h-6 ring-2 border-none ring-black/70 flex items-center justify-center rounded-md border"
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="max-w-xs gap-2 grid w-[14rem]"
            >
              {supportedSocialsIcon.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <label
                    htmlFor="airplane-mode"
                    className="capitalize flex gap-2"
                  >
                    {item.icon}
                    {item.name}
                  </label>
                  <Switch id="airplane-mode" />
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <section className="border-t gap-2 pt-4 flex">
        <div className="relative">
          <div className="w-8 h-8 border bg-white z-10 flex-shrink-0 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="@johndoe"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          {threads.length > 1 && (
            <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-300"></div>
          )}
        </div>

        <div className="w-full gap-4 grid">
          {threads.map((thread, index) => (
            <ThreadComponent
              key={thread.id}
              thread={thread}
              index={index}
              maxChars={maxChars}
              updateThreadOnMaxChar={(newContent) =>
                updateThreadOnMaxChar(index, newContent)
              }
              updateThread={(newContent) => updateThread(index, newContent)}
              addThread={() => addThread(index)}
              removeThread={() => removeThread(index)}
              handleImageUpload={(e) => handleImageUpload(index, e)}
              deleteImage={(imageIndex) => deleteImage(index, imageIndex)}
              setSelectedImage={setSelectedImage}
              setIsImageModalOpen={setIsImageModalOpen}
              contentType={contentType}
            />
          ))}
        </div>
      </section>
      <ImageEditorModal
        selected={selectedImage}
        open={isImageModalOpen}
        setOpen={setIsImageModalOpen}
      />
    </div>
  );
}

function ThreadComponent({
  thread,
  index,
  maxChars,
  updateThread,
  addThread,
  removeThread,
  handleImageUpload,
  deleteImage,
  setSelectedImage,
  contentType,
  setIsImageModalOpen,
  updateThreadOnMaxChar,
}: ThreadComponentProps) {
  const router = useRouter();
  const editor = useEditor({
    // @ts-ignore
    extensions,
    content: thread.content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getText();
      updateThreadOnMaxChar(newContent);
    },
    editable: true,
    autofocus: true,
  });

  return (
    <div className="w-full pt-0.5">
      <div className="flex justify-between items-center">
        {index > 0 && (
          <Button
            onClick={addThread}
            variant="outline"
            size="icon"
            className="w-8 absolute left-0 h-8 border rounded-full"
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>
        )}
        <div className="flex items-center gap-1">
          <p className="font-medium">Ade</p>
          <span className="tracking-tight text-sm">@_tsdev</span>
        </div>
        <CircularProgress
          limitWordLeft={maxChars - thread.content.length}
          warningWordLeft={thread.content.length - maxChars}
          className="w-7 h-7"
          percentage={(thread.content.length / maxChars) * 100}
        />
      </div>
      <div className="prose selection:bg-fuchsia-300 selection:text-fuchsia-900 text-gray-600 prose-blockquote:mt-0 prose-p:mt-0 prose-h2:mt-0 prose-h1:mt-0 prose-h3:mt-0 prose-h4:mt-0 max-w-none">
        <EditorContent editor={editor} />
        {thread.images.length > 0 && (
          <ImageGrid
            handleDelete={deleteImage}
            handleEdit={(item, index) => {
              setSelectedImage(item);
              router.navigate({
                to: `/post/t=${thread.id}&p=${index}&content=${contentType}/edit`,
              });
              // setIsImageModalOpen(true);
            }}
            images={thread.images}
          />
        )}

        <div className="overflow-x-auto w-fit ml-auto lg:overflow-x-visible">
          <MenuBar
            showAdd={index === 0 ? true : false}
            showDelete={index > 0 ? true : false}
            handleDeleteThread={removeThread}
            handleAddThread={addThread}
            handleAddImageFn={handleImageUpload}
          />
        </div>
      </div>
    </div>
  );
}
