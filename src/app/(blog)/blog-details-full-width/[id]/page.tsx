import all_blogs from "@/data/blog-data";
import BlogDetailsRelatedBlogs from "@/components/blog/details/blog-details-related-blogs";
import DetailsBreadcrumb from "../_components/details-breadcrumb";
import FullWidthImg from "../_components/full-width-img";
import BlogDetailsArea from "../_components/blog-details-area";

export default function BlogDetailsFullWidthPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = all_blogs.find((blog) => blog.id.toString() === params.id);
  return (
    <main>
      {blog ? (
        <>
          {/* breadcrumb area start */}
          <DetailsBreadcrumb/>
          {/* breadcrumb area end */}

          {/* full width image */}
          <FullWidthImg/>
          {/* full width image */}

          {/* blog details area start */}
          <BlogDetailsArea blog={blog}/>
          {/* blog details area end */}

          {/* related blogs area start */}
          <BlogDetailsRelatedBlogs/>
          {/* related blogs area end */}
        </>
      ) : (
        <div className="text-center mt-100 mb-80">
          No blog found with id: {params.id}
        </div>
      )}
    </main>
  );
}
