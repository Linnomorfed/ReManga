import ContentLoader from "react-content-loader"

const CommentLoader = () => (
  <ContentLoader
    speed={2}
    width={640}
    height={126}
    uniqueKey='comment'
    viewBox="0 0 640 126"
    backgroundColor="#7878780d"
    foregroundColor="#78787824"
  >
    <circle cx="32" cy="50" r="30" />
    <rect x="70" y="30" rx="3" ry="3" width="250" height="10" />
    <rect x="70" y="60" rx="0" ry="0" width="420" height="10" />
    <rect x="70" y="92" rx="0" ry="0" width="140" height="10" />
  </ContentLoader>
)

export default CommentLoader;
