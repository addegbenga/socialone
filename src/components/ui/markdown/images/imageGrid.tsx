import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "../../button";
import { X } from "lucide-react";

export default function ImageGrid({
  images,
  handleDelete,
  handleEdit,
}: {
  handleEdit: (item: any, index: number) => void;
  handleDelete: (idx: number) => void;
  images: { img: string; rawFile: any }[];
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full relative -mt-8"
    >
      <CarouselContent className="rounded-xl ml-0">
        {images.map((item, index) => (
          <CarouselItem
            key={index}
            className={cn(
              images.length > 1 ? "basis-1/2" : "",
              "relative pl-1"
            )}
          >
            <img
              src={item.img}
              alt={`Uploaded-${index}`}
              className="w-full h-[20rem] object-cover rounded-xl"
            />
            <div className="absolute top-10 left-0 right-0 flex justify-between ">
              <Button
                onClick={() => handleEdit(item, index)}
                // onClick={() => handleImageEdit(index)}
                className="rounded-full absolute left-4 px-4 ml-2 h-7 "
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(index)}
                className="rounded-full absolute right-2 w-7 h-7"
                variant={"outline"}
                size={"icon"}
              >
                <X className="w-4 h4" />
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-0" />
      <CarouselNext className="absolute right-0" />
    </Carousel>
  );
}
