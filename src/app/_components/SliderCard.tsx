import { MdOutlineAccessTimeFilled } from "react-icons/md";

type SliderCardProps = {
    _id: string;
    image: string;
    title: string;
    price: { amount?: string; currencyCode?: string };
    minimumDuration: string;
    description: string | null;
};

const SliderCard: React.FC<SliderCardProps> = ({
    _id,
    image,
    title,
    price,
    minimumDuration,
    description
}) => {
    return (
        <div className="slider-card">
            <div className="slider-card__image">
                <img className="slider-image" src={image} alt={title} />
            </div>
            <h3 className="slider-card__title">{title}</h3>

            <div className="slider-card__price">
                {price.amount && price.currencyCode ? (
                    <>
                        <span className="price-from">from </span>{" "}
                        {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR"
                        }).format(Number(price.amount))}
                    </>
                ) : (
                    <span>Free</span>
                )}
            </div>
            <div className="slider-card__duration">
                {minimumDuration && minimumDuration.length > 1 ? (
                    <>
                        <MdOutlineAccessTimeFilled /> {minimumDuration}
                    </>
                ) : null}
            </div>
            <div className="slider-card__description">{description ? description : ""}</div>
        </div>
    );
};

export default SliderCard;
