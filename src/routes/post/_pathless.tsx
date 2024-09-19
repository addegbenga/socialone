import PostLayoutView from "@/modules/post/layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/post/_pathless")({
  component: PostLayout,
});

function PostLayout() {
  return (
    <PostLayoutView>
      <Outlet />
    </PostLayoutView>
  );
}
