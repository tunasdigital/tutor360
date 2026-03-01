import { StarTwo } from "@/components/svg";

// Dados fictícios de avaliação. No futuro, também virão do Prisma.
const ratingData = [
    { stars: "5 estrelas", percentage: 82, width: "82%" },
    { stars: "4 estrelas", percentage: 30, width: "30%" },
    { stars: "3 estrelas", percentage: 15, width: "15%" },
    { stars: "2 estrelas", percentage: 6, width: "6%" },
    { stars: "1 estrela", percentage: 10, width: "10%" },
];

export default function CourseDetailsRatingReviews() {
    return (
        <div className="tp-course-details-2-review-rating">
            <div className="row gx-2">
                <div className="col-lg-4">
                    <div className="tp-course-details-2-review-rating-info text-center">
                        <h5>4.5</h5>
                        <div className="rating-icons mb-5">
                            <span><StarTwo /></span>
                            <span><StarTwo /></span>
                            <span><StarTwo /></span>
                            <span><StarTwo /></span>
                            <span><StarTwo clr="#BFC5CA" /></span>
                        </div>
                        {/* Texto adaptado para fazer mais sentido e soar mais natural */}
                        <p>Baseado em 1 avaliação</p>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="tp-course-details-2-review-details">
                        <div className="tp-course-details-2-review-content">
                            {ratingData.map((rating, index) => (
                                <div
                                    key={index}
                                    className="tp-course-details-2-review-item d-flex align-items-center justify-content-between"
                                >
                                    <div className="tp-course-details-2-review-text">
                                        <span>{rating.stars}</span>
                                    </div>
                                    <div className="tp-course-details-2-review-progress">
                                        <div className="single-progress" style={{ width: rating.width }}></div>
                                    </div>
                                    <div className="tp-course-details-2-review-percent">
                                        <h5>{rating.percentage}%</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}