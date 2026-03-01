import { StarTwo } from "@/components/svg";

export default function CourseDetailsReviewForm() {
  return (
    <form>
      <div className="tp-course-details-2-comment-star">
        <span><StarTwo /></span>
        <span><StarTwo /></span>
        <span><StarTwo /></span>
        <span><StarTwo /></span>
        <span><StarTwo clr="#BFC5CA" /></span>
      </div>

      <div className="tp-contact-input-form">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-contact-input p-relative">
              <label>Título da Avaliação</label>
              <input type="text" placeholder="Ex: Excelente didática!" />
            </div>
          </div>
          <div className="col-xl-12">
            <div className="tp-contact-input p-relative">
              <label>Seu Comentário</label>
              <textarea placeholder="Conte-nos mais sobre a sua experiência..."></textarea>
            </div>
          </div>
          <div className="tp-contact-btn">
            <button className="tp-btn-inner">Publicar Avaliação</button>
          </div>
        </div>
      </div>
    </form>
  )
}