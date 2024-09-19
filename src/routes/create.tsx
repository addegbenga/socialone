import { createFileRoute } from "@tanstack/react-router";
import CreatePostView from "../modules/post";

export const Route = createFileRoute("/create")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="p-2">
      <CreatePostView />
    </div>
  );
}
