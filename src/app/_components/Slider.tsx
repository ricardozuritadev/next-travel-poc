import SliderCard from "./SliderCard";

type SliderProps = {
    title: string;
    data: any[];
};

const getActivitiesWithPictures = (data: any[]) => {
    return data.filter(
        (activity) => Array.isArray(activity.pictures) && activity.pictures.length > 0
    );
};

const Slider: React.FC<SliderProps> = ({ title, data }) => {
    const firstTenActivities = getActivitiesWithPictures(data).slice(0, 10);
    return (
        <>
            <div className="slider">
                <div className="slider__header-container">
                    <h3>{title}</h3>
                    <div className="slider__controls-container">
                        {/*TODO: Create a component for controls*/}
                    </div>
                </div>
                <div className="slider__content">
                    {firstTenActivities.map((item, index) => {
                        console.log("=> item: ", item);

                        const slideData = {
                            _id: item.id,
                            title: item.name,
                            image: item.pictures[0],
                            price: item.price,
                            minimumDuration: item.minimumDuration,
                            description: item.description
                        };
                        return <SliderCard key={index} {...slideData} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default Slider;
