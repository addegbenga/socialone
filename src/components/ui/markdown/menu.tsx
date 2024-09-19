import { useCurrentEditor } from "@tiptap/react";
import { Arrow } from "@radix-ui/react-tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import { cn } from "../../../lib/utils";
import { toggleVariants } from "../toggle";
import { useCallback } from "react";
import { Plus, PlusCircle, Trash, Trash2 } from "lucide-react";

const icons = {
  dmSvg: (
    <svg
      fill="none"
      viewBox="0 0 20 20"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-ds-button-icon w-5 h-5 stroke-slate-600"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M8.00006 8.99994H10.0001M10.0001 8.99994H12.0001M10.0001 8.99994V10.9999M10.0001 8.99994V6.99994M7.08342 15.8333H6.66675C3.33341 15.8333 1.66675 15 1.66675 10.8333V6.66663C1.66675 3.33329 3.33341 1.66663 6.66675 1.66663H13.3334C16.6667 1.66663 18.3334 3.33329 18.3334 6.66663V10.8333C18.3334 14.1666 16.6667 15.8333 13.3334 15.8333H12.9167C12.6584 15.8333 12.4084 15.9583 12.2501 16.1666L11.0001 17.8333C10.4501 18.5666 9.55008 18.5666 9.00008 17.8333L7.75008 16.1666C7.61675 15.9833 7.30842 15.8333 7.08342 15.8333Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  ),
  imgSvg: (
    <svg
      data-v-4d11f6a6=""
      data-v-6b771f96=""
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      fill="none"
      className="stroke-ds-button-icon  w-5 h-5 stroke-slate-600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        data-v-4d11f6a6=""
        d="M7.50002 18.3334H12.5C16.6667 18.3334 18.3334 16.6667 18.3334 12.5V7.50002C18.3334 3.33335 16.6667 1.66669 12.5 1.66669H7.50002C3.33335 1.66669 1.66669 3.33335 1.66669 7.50002V12.5C1.66669 16.6667 3.33335 18.3334 7.50002 18.3334Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        data-v-4d11f6a6=""
        d="M7.49998 8.33333C8.42045 8.33333 9.16665 7.58714 9.16665 6.66667C9.16665 5.74619 8.42045 5 7.49998 5C6.57951 5 5.83331 5.74619 5.83331 6.66667C5.83331 7.58714 6.57951 8.33333 7.49998 8.33333Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        data-v-4d11f6a6=""
        d="M2.22498 15.7917L6.33331 13.0333C6.99164 12.5917 7.94164 12.6417 8.53331 13.15L8.80831 13.3917C9.45831 13.95 10.5083 13.95 11.1583 13.3917L14.625 10.4167C15.275 9.85834 16.325 9.85834 16.975 10.4167L18.3333 11.5833"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  ),
  gifSvg: (
    <svg
      fill="none"
      viewBox="0 0 20 20"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-ds-button-icon  w-5 h-5 stroke-slate-600 fill-slate-600"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        d="M7.50326 18.3367H12.5033C16.6699 18.3367 18.3366 16.67 18.3366 12.5033V7.50332C18.3366 3.33665 16.6699 1.66998 12.5033 1.66998H7.50326C3.33659 1.66998 1.66992 3.33665 1.66992 7.50332V12.5033C1.66992 16.67 3.33659 18.3367 7.50326 18.3367Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        xmlns="http://www.w3.org/2000/svg"
        stroke="none"
        d="M7.71271 9.33771C7.67543 9.2081 7.62305 9.09357 7.55558 8.99414C7.4881 8.89293 7.40554 8.80771 7.30788 8.73846C7.212 8.66744 7.10192 8.61328 6.97763 8.57599C6.85511 8.53871 6.71928 8.52006 6.57014 8.52006C6.29137 8.52006 6.04634 8.58931 5.83505 8.72781C5.62553 8.8663 5.46218 9.06783 5.34499 9.33239C5.22781 9.59517 5.16921 9.91655 5.16921 10.2965C5.16921 10.6765 5.22692 10.9996 5.34233 11.266C5.45774 11.5323 5.62109 11.7356 5.83239 11.8759C6.04368 12.0144 6.29315 12.0836 6.58079 12.0836C6.8418 12.0836 7.06463 12.0375 7.24929 11.9451C7.43572 11.851 7.57777 11.7188 7.67543 11.5483C7.77486 11.3778 7.82457 11.1763 7.82457 10.9437L8.05895 10.9783H6.6527V10.1101H8.93519V10.7972C8.93519 11.2766 8.83398 11.6886 8.63157 12.033C8.42915 12.3757 8.15039 12.6403 7.79528 12.8267C7.44016 13.0114 7.03356 13.1037 6.57546 13.1037C6.0641 13.1037 5.61488 12.9909 5.22781 12.7654C4.84073 12.5382 4.53888 12.2159 4.32227 11.7987C4.10742 11.3796 4 10.8825 4 10.3072C4 9.86506 4.06392 9.47088 4.19176 9.12464C4.32138 8.77663 4.50249 8.48189 4.73509 8.24041C4.96768 7.99893 5.23846 7.81516 5.54741 7.6891C5.85636 7.56303 6.19105 7.5 6.55149 7.5C6.86044 7.5 7.14808 7.54528 7.41442 7.63583C7.68075 7.72461 7.9169 7.85067 8.12287 8.01403C8.33061 8.17738 8.50018 8.3718 8.63157 8.5973C8.76296 8.82102 8.8473 9.06783 8.88459 9.33771H7.71271Z"
      ></path>
      <path
        xmlns="http://www.w3.org/2000/svg"
        stroke="none"
        d="M10.9547 7.57457V13.0291H9.80145V7.57457H10.9547Z"
      ></path>
      <path
        xmlns="http://www.w3.org/2000/svg"
        stroke="none"
        d="M11.9035 13.0291V7.57457H15.515V8.52539H13.0567V9.82511H15.2753V10.7759H13.0567V13.0291H11.9035Z"
      ></path>
    </svg>
  ),
  pollSvg: (
    <svg
      fill="none"
      viewBox="0 0 20 20"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-ds-button-icon  w-5 h-5 stroke-slate-600"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M7.50002 18.3334H12.5C16.6667 18.3334 18.3334 16.6667 18.3334 12.5V7.50002C18.3334 3.33335 16.6667 1.66669 12.5 1.66669H7.50002C3.33335 1.66669 1.66669 3.33335 1.66669 7.50002V12.5C1.66669 16.6667 3.33335 18.3334 7.50002 18.3334Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M12.9167 15.4166C13.8333 15.4166 14.5833 14.6666 14.5833 13.75V6.24998C14.5833 5.33331 13.8333 4.58331 12.9167 4.58331C12 4.58331 11.25 5.33331 11.25 6.24998V13.75C11.25 14.6666 11.9917 15.4166 12.9167 15.4166Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M7.08335 15.4167C8.00002 15.4167 8.75002 14.6667 8.75002 13.75V10.8334C8.75002 9.91669 8.00002 9.16669 7.08335 9.16669C6.16669 9.16669 5.41669 9.91669 5.41669 10.8334V13.75C5.41669 14.6667 6.15835 15.4167 7.08335 15.4167Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  ),
  emojiSvg: (
    <svg
      data-v-4ff37046=""
      data-v-4781290c=""
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-ds-button-icon  w-5 h-5 stroke-slate-600"
    >
      <path
        data-v-4ff37046=""
        d="M7.50002 18.3334H12.5C16.6667 18.3334 18.3334 16.6667 18.3334 12.5V7.50002C18.3334 3.33335 16.6667 1.66669 12.5 1.66669H7.50002C3.33335 1.66669 1.66669 3.33335 1.66669 7.50002V12.5C1.66669 16.6667 3.33335 18.3334 7.50002 18.3334Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        data-v-4ff37046=""
        d="M12.9167 8.125C13.607 8.125 14.1667 7.56536 14.1667 6.875C14.1667 6.18464 13.607 5.625 12.9167 5.625C12.2263 5.625 11.6667 6.18464 11.6667 6.875C11.6667 7.56536 12.2263 8.125 12.9167 8.125Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        data-v-4ff37046=""
        d="M7.08331 8.125C7.77367 8.125 8.33331 7.56536 8.33331 6.875C8.33331 6.18464 7.77367 5.625 7.08331 5.625C6.39296 5.625 5.83331 6.18464 5.83331 6.875C5.83331 7.56536 6.39296 8.125 7.08331 8.125Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        data-v-4ff37046=""
        d="M7 11.0833H13C13.4167 11.0833 13.75 11.4166 13.75 11.8333C13.75 13.9083 12.075 15.5833 10 15.5833C7.925 15.5833 6.25 13.9083 6.25 11.8333C6.25 11.4166 6.58333 11.0833 7 11.0833Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  ),
  categorySvg: (
    <svg
      fill="none"
      viewBox="0 0 20 20"
      height="20"
      width="20"
      className="stroke-ds-button-icon w-7 h-7 stroke-slate-600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M4.1665 8.33332H5.83317C7.49984 8.33332 8.33317 7.49999 8.33317 5.83332V4.16666C8.33317 2.49999 7.49984 1.66666 5.83317 1.66666H4.1665C2.49984 1.66666 1.6665 2.49999 1.6665 4.16666V5.83332C1.6665 7.49999 2.49984 8.33332 4.1665 8.33332Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M14.1665 8.33332H15.8332C17.4998 8.33332 18.3332 7.49999 18.3332 5.83332V4.16666C18.3332 2.49999 17.4998 1.66666 15.8332 1.66666H14.1665C12.4998 1.66666 11.6665 2.49999 11.6665 4.16666V5.83332C11.6665 7.49999 12.4998 8.33332 14.1665 8.33332Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M14.1665 18.3333H15.8332C17.4998 18.3333 18.3332 17.5 18.3332 15.8333V14.1667C18.3332 12.5 17.4998 11.6667 15.8332 11.6667H14.1665C12.4998 11.6667 11.6665 12.5 11.6665 14.1667V15.8333C11.6665 17.5 12.4998 18.3333 14.1665 18.3333Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M4.1665 18.3333H5.83317C7.49984 18.3333 8.33317 17.5 8.33317 15.8333V14.1667C8.33317 12.5 7.49984 11.6667 5.83317 11.6667H4.1665C2.49984 11.6667 1.6665 12.5 1.6665 14.1667V15.8333C1.6665 17.5 2.49984 18.3333 4.1665 18.3333Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  ),
};
export const MenuBar = ({
  handleAddImageFn,
  handleAddThread,
  handleDeleteThread,
  showAdd = true,
  showDelete = true,
}: {
  handleAddImageFn: (e: any) => void;
  showAdd: boolean;
  showDelete: boolean;
  handleDeleteThread: () => void;
  handleAddThread: () => void;
}) => {
  return (
    <div className="flex">
      <ToggleGroup className="flex items-center gap-0" type="multiple">
        {showAdd ? (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="bold"
                  onClick={handleAddThread}
                  className={cn(toggleVariants({ size: "sm" }))}
                  aria-label="Toggle bold"
                >
                  <PlusCircle className="w-5 h-5" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent className=" text-xs h-7 px-2">
                <p>Add Thread</p>
                <Arrow className="fill-white" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          ""
        )}
        {showDelete ? (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  onClick={handleDeleteThread}
                  value="bold"
                  className={cn(toggleVariants({ size: "sm" }))}
                  aria-label="Toggle bold"
                >
                  <Trash2 className="w-5 mb-0.5 h-5" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent className=" text-xs h-7 px-2">
                <p>Delete</p>
                <Arrow className="fill-white" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          ""
        )}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                // onClick={(e: any) => {
                //   editor.chain().focus().toggleBold().run();
                // }}
                // disabled={!editor.can().chain().focus().toggleBold().run()}
                value="bold"
                className={cn(toggleVariants({ size: "sm" }))}
                aria-label="Toggle bold"
              >
                {icons.dmSvg}
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent className=" text-xs h-7 px-2">
              <p>Message</p>
              <Arrow className="fill-white" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                className={cn(
                  toggleVariants({
                    size: "sm",
                    className: "data-[state=on]:bg-transparent",
                  })
                )}
                value="italic"
                aria-label="Toggle italic"
              >
                {icons.imgSvg}
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  name="file"
                  id="file"
                  className=" w-5 absolute opacity-0"
                  onChange={(e) => handleAddImageFn(e)}
                />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent className=" text-xs h-7 px-2">
              <p>Image</p>
              <Arrow className="fill-white" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                // onClick={() => editor.chain().focus().toggleStrike().run()}
                // disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={cn(toggleVariants({ size: "sm" }))}
                value="strike"
                aria-label="Toggle strike"
              >
                {icons.gifSvg}
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent className=" text-xs h-7 px-2">
              <p>Gif</p>
              <Arrow className="fill-white" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                // onClick={() => editor.chain().focus().toggleUnderline().run()}
                // disabled={!editor.can().chain().focus().toggleUnderline().run()}
                className={cn(toggleVariants({ size: "sm" }))}
                value="underline"
                aria-label="Toggle underline"
              >
                {icons.pollSvg}
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent className=" text-xs h-7 px-2">
              <p>Poll</p>
              <Arrow className="fill-white" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                // onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={cn(toggleVariants({ size: "sm" }))}
                value="blockquote"
                aria-label="Toggle blockquote"
              >
                {icons.emojiSvg}
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent className=" text-xs h-7 px-2">
              <p>Emoji</p>
              <Arrow className="fill-white" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ToggleGroup>
    </div>
  );
};
