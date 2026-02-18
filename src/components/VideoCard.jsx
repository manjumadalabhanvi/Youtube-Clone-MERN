import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video._id}`}>
      <div className="cursor-pointer">

        {/* THUMBNAIL IMAGE */}
        <img
          className="w-full h-44 object-cover rounded-lg mb-2"
          src={video.thumbnailUrl}
          alt={video.title}
        />

        {/* TITLE */}
        <h3 className="text-sm font-semibold text-white">
          {video.title}
        </h3>

      </div>
    </Link>
  );
}

export default VideoCard;
