import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import BlogDetails from "../components/BlogDetails";

const BlogPage = () => {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigation = useNavigate();
  const { setLoading, loading } = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      setBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);
    } catch (error) {
      setBlog(null);
      setRelatedBlogs([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (blogId) {
      fetchRelatedBlogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className="w-11/12 max-w-[670px]  py-8 flex flex-col  mt-[66px] gap-y-7 mb-[70px]  justify-center items-center">
      <Header />
      <div className="flex justify-start w-[100%] mb-[-44px]">
        <button
          className="rounded-md border-2 px-4 py-1"
          onClick={() => navigation(-1)}
        >
          Back
        </button>
      </div>
      {loading ? (
        <div>
          <p> Loading</p>
        </div>
      ) : blog ? (
        <div>
          <BlogDetails post={blog} />
          <h2> Related Blogs </h2>
          {relatedBlogs.map((post) => (
            <div key={post.id}>
              <BlogDetails post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No Blog Found</p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
