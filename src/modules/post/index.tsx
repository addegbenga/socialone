import ThreadedMarkdown from "@/components/ui/markdown/tapMarkdown";

export default function CreatePostView() {
  return (
    <div>
      <ThreadedMarkdown contentType="TWEET" maxChars={280} />
    </div>
  );
}
