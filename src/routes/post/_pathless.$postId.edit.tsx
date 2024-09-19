import EditPostImage from '@/modules/post/editPostImage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/post/_pathless/$postId/edit')({
  component: EditPost,
})

function EditPost() {
  return (
    <div className="p-2">
      <EditPostImage />
    </div>
  )
}
