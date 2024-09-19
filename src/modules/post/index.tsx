import ThreadedMarkdown from "@/components/ui/markdown/tapMarkdown";

export default function CreatePostView() {
  return (
    <div className="container mx-auto p-4">
      <ThreadedMarkdown contentType="TWEET" maxChars={280} />
    </div>
  );
}
