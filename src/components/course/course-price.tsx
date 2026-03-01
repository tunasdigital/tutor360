import { formatPrice } from "@/lib/format-price";
import { discountPrice } from "@/utils";

type IProps = {
    discount: number;
    price: number;
}

export default function CoursePrice({ discount, price }: IProps) {
    // Regra de negócio estratégica: Se o preço for 0 ou indefinido, exibimos "Gratuito"
    if (!price || price === 0) {
        return <span className="free-course-label">Gratuito</span>;
    }

    return (
        discount > 0 ? (
            <>
                <del>{formatPrice(price, true)}</del>
                <span>{" "}{formatPrice(discountPrice(price, discount), true)}</span>
            </>
        ) : (
            <span>{formatPrice(price, true)}</span>
        )
    )
}