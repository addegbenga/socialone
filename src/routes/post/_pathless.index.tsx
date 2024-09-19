import CreatePostView from '@/modules/post'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/post/_pathless/')({
  component: CreatePost,
})

function CreatePost() {
  return (
    <div className="p-2">
      <CreatePostView />
    </div>
  )
}
