import all_blogs from "@/data/blog-data";
import DetailsBreadcrumb from "../_components/details-breadcrumb";
import BlogDetailsArea from "../_components/blog-details-area";
import BlogDetailsRelatedBlogs from "@/components/blog/details/blog-details-related-blogs";


export function generateMetadata({ params }: {params: {id: string}}) {
  const id = params.id;
  const blog = all_blogs.find((item) => item.id == Number(id));
  return {
    title: blog?.title,
  };
}

export default function BlogDetailsPage({
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
          <DetailsBreadcrumb title={blog.title} />
          {/* breadcrumb area end */}

          {/* blog details area start */}
          <BlogDetailsArea blog={blog} />
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
