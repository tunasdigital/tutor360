'use client';
import { useState } from "react";
import { DisLikeSvg, LikeSvg, StarTwo } from "@/components/svg";
import Image from "next/image";

// Dados fictícios (mockados) temporários do template. 
// No futuro, podemos conectar isso ao Prisma para puxar avaliações reais.
const reviewsData = [
    {
        name: "David W.",
        img: "/assets/img/course/details/user-2.png",
        rating: 4,
        timeAgo: "há 2 semanas",
        content: "Adorei a didática do instrutor durante o curso. Muito fácil de acompanhar, embora seja um pouco desafiador, exatamente como eu esperava."
    },
    {
        name: "Nithish ..",
        img: "/assets/img/course/details/user-3.png",
        rating: 4,
        timeAgo: "há 2 semanas",
        content: "Excelente curso! A forma como o conteúdo é passado torna tudo mais simples, sem perder o nível de desafio necessário para o aprendizado."
    }
];

export default function CourseDetailsFeaturedReviews() {
    const [visibleReviews, setVisibleReviews] = useState(1);

    const showMoreReviews = () => {
        setVisibleReviews((prevVisible) => prevVisible + 1);
    };

    return (
        <div className="tp-course-details-2-review-reply-wrap">
            {reviewsData.slice(0, visibleReviews).map((review, index) => (
                <div className="tp-course-details-2-review-item-reply" key={index}>
                    <div className="tp-course-details-2-review-top d-flex">
                        <div className="tp-course-details-2-review-thumb">
                            <Image src={review.img} alt={review.name} width={50} height={50} />
                        </div>
                        <div className="tp-course-details-2-review-content">
                            <h4>{review.name}</h4>
                            <div className="tp-course-details-2-review-star">
                                {[...Array(5)].map((_, starIndex) => (
                                    <span key={starIndex}>
                                        <StarTwo clr={starIndex < review.rating ? "#FFC107" : "#BFC5CA"} />
                                    </span>
                                ))}
                                <span className="span"> {review.timeAgo}</span>
                            </div>
                        </div>
                    </div>
                    <p>{review.content}</p>
                    <div className="tp-course-details-2-review-react d-flex align-items-center">
                        <span>Útil? </span>
                        <div className="react">
                            <a href="#"><span><LikeSvg /></span></a>
                            <a href="#"><span><DisLikeSvg /></span></a>
                        </div>
                    </div>
                </div>
            ))}
            {visibleReviews < reviewsData.length && (
                <div className="tp-course-details-2-review-reply-btn">
                    <a className="pointer" onClick={showMoreReviews}>Mostrar Mais Avaliações</a>
                </div>
            )}
        </div>
    );
}