import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(

`http://localhost:5000/api/videos?category=${selectedCategory}&search=${search}`

);

        setVideos(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideos();
  }, [selectedCategory, search]);

  return (
    <div className="bg-black min-h-screen">
      <Navbar setSearch={setSearch}/>

      <div className="flex">
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 px-6 py-4">
          {/* CATEGORY CHIPS */}
          <div className="flex gap-3 mb-6 overflow-x-auto">
            {["All", "Gaming", "Music", "Live", "React", "JavaScript"].map(
              (cat) => (
                <span
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1 rounded-full text-sm cursor-pointer

${selectedCategory === cat ? "bg-white text-black" : "bg-zinc-800 text-white"}`}
                >
                  {cat}
                </span>
              ),
            )}
          </div>

          {/* VIDEO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
