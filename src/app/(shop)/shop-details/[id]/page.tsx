import bookData from "@/data/book-shop-data";
import ShopDetailsArea from "../_components/shop-details-area";
import RelatedProducts from "../_components/related-products";

export function generateMetadata({ params }: { params: { id: string } }) {
   const id = params.id;
   const bookItem = bookData.find((item) => item.id == Number(id));
   return {
      title: bookItem?.title ? `${bookItem.title} - Acadia` : "Shop Details - Acadia",
   };
}

export default function ShopDetailsPage({
   params,
}: {
   params: { id: string };
}) {
   const bookItem = bookData.find((bookItem) => bookItem.id.toString() === params.id);
   return (
      <main>
         {bookItem ? (
            <>
               {/* shop details area start */}
               <ShopDetailsArea product={bookItem} />
               {/* shop details area end */}

               {/* related products */}
               <RelatedProducts/>
               {/* related products */}

            </>
         ) : (
            <div className="text-center mt-100 mb-80">
               No Book found with id: {params.id}
            </div>
         )}
      </main>
   );
}
