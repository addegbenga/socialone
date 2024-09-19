import { Button } from "@/components/ui/button";
import ImageEditor from "@/components/ui/markdown/images";
import { useSocialPostStorage } from "@/context/socialPostContext";
import { useNavigate, useParams, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export default function EditPostImage() {
  const { navigate } = useRouter();
  const { getImageById } = useSocialPostStorage();
  const { postId } = useParams({ strict: false });
  const searchParams = new URLSearchParams(postId);
  const threadId = searchParams.get("t") as string;
  const pictureIndex = searchParams.get("p");
  const contentType = searchParams.get("content") as string;
  const threads = getImageById(contentType, threadId, Number(pictureIndex));

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button
          className=""
          onClick={() => navigate({ to: "/post" })}
          variant="outline"
          size="icon"
        >
          <ArrowLeft size={18} />
        </Button>

        <h1 className="mx-auto text-xl tracking-tight">Edit Image</h1>
      </div>
      <section className="pt-7">
        <ImageEditor
          selected={{
            img: threads?.img as any,
            rawFile: threads?.rawFile as any,
          }}
        />
      </section>
    </div>
  );
}
