import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Watch() {
  const { id } = useParams();

  // ✅ proper default state
  const [video, setVideo] = useState(null);

  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);

  // 🔐 get logged-in user id
  const token = localStorage.getItem("token");

  let currentUserId = null;

  if (token) {
    const decoded = jwtDecode(token);

    currentUserId = decoded.id;
  }

  // =========================
  // FETCH VIDEO
  // =========================

  const fetchVideo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/videos/${id}`);

      setVideo(res.data);
       setSubscribed(
      res.data.user?.subscribers?.some(
        (uid) => uid.toString() === currentUserId
      )
    );
    } catch (err) {
      console.log(err);
    }
  };
  // CHECK SUBSCRIBE STATUS

  useEffect(() => {
    if (video?.user) {
      setSubscriberCount(video.user.subscribers?.length || 0);

      setSubscribed(video.user.subscribers?.includes(currentUserId));
    }
  }, [video]);

  useEffect(() => {
    fetchVideo();
  }, [id]);

  useEffect(() => {
    axios.put(`http://localhost:5000/api/videos/view/${id}`);
  }, [id]);
  // =========================
  // FETCH COMMENTS
  // =========================

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${id}`);

      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // =========================
  // ADD COMMENT
  // =========================

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/comments",

        {
          text: newComment,

          videoId: id,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setNewComment("");

      fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // DELETE COMMENT
  // =========================

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/comments/${commentId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // LIKE
  // =========================

  const handleLike = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/videos/like/${id}`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchVideo(); // ✅ refresh video
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // DISLIKE
  // =========================

  const handleDislike = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/videos/dislike/${id}`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchVideo(); // ✅ refresh video
    } catch (err) {
      console.log(err);
    }
  };
  // SUBSCRIBE FUNCTION

  const handleSubscribe = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/subscribe/${video.user._id}`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSubscriberCount(res.data.subscribers);

      setSubscribed(!subscribed);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // LOADING STATE
  // =========================

  if (!video) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const isLiked = video?.likes?.includes(currentUserId);

  const isDisliked = video?.dislikes?.includes(currentUserId);
  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-4xl px-4 py-6">
        {/* VIDEO */}

        <video
          className="w-full rounded-xl mb-4 bg-black"
          controls
          src={video.videoUrl}
        />

        {/* TITLE */}

        <h1 className="text-xl font-semibold mb-2">{video.title}</h1>
        {/* CHANNEL + SUBSCRIBE */}

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
              {video.user?.username?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="font-semibold">{video.user?.username}</p>

              <p className="text-gray-400 text-sm">
                {subscriberCount} subscribers
              </p>
            </div>
          </div>

          <button
            onClick={handleSubscribe}
            className={`px-4 py-2 rounded-full font-semibold

  ${subscribed ? "bg-gray-600" : "bg-red-600"}

  `}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        {/* VIEWS */}

        <p className="text-gray-400 text-sm mb-3">{video.views || 0} views</p>

        {/* LIKE / DISLIKE */}

        <div className="flex gap-4 items-center mb-4">
          <button
            onClick={handleLike}
            className={`px-4 py-1 rounded-full flex items-center gap-1 transition
    ${isLiked ? "bg-blue-600" : "bg-zinc-800 hover:bg-zinc-700"}
    `}
          >
            👍 {video?.likes?.length || 0}
          </button>

          <button
            onClick={handleDislike}
            className={`px-4 py-1 rounded-full flex items-center gap-1 transition
    ${isDisliked ? "bg-blue-600" : "bg-zinc-800 hover:bg-zinc-700"}
    `}
          >
            👎 {video?.dislikes?.length || 0}
          </button>
        </div>

        {/* DESCRIPTION */}

        <div className="bg-zinc-900 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-300">{video.description}</p>
        </div>

        {/* COMMENTS COUNT */}

        <h2 className="text-lg font-semibold mb-4">
          {comments.length} Comments
        </h2>

        {/* ADD COMMENT */}

        <form onSubmit={handleAddComment} className="flex gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-600"></div>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Add comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-transparent border-b border-gray-500 outline-none"
            />

            <button
              type="submit"
              className="mt-2 px-4 py-1 bg-blue-600 rounded-full"
            >
              Comment
            </button>
          </div>
        </form>

        {/* COMMENTS */}

        <div className="space-y-5">
          {comments.map((comment) => (
           <div key={comment._id} className="flex gap-3">

 <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center font-semibold">

  {comment.userId?.username?.charAt(0).toUpperCase()}

 </div>

 <div>

  <p className="font-semibold">

   {comment.userId?.username}

  </p>

  <p>

   {comment.text}

  </p>

  {comment.userId?._id === currentUserId && (

   <button

    onClick={() => handleDeleteComment(comment._id)}

    className="text-red-500 text-sm"

   >

    Delete

   </button>

  )}

 </div>

</div>

          ))}
        </div>
      </div>
    </div>
  );
}

export default Watch;
