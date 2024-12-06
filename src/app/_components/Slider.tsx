import SliderCard from "./SliderCard";
import SliderControls from "./SliderControls";

type SliderProps = {
    title: string;
    data: any[];
    id: string;
};

const getActivitiesWithPictures = (data: any[]) => {
    return data.filter(
        (activity) => Array.isArray(activity.pictures) && activity.pictures.length > 0
    );
};

const Slider: React.FC<SliderProps> = ({ title, data, id }) => {
    const activities = getActivitiesWithPictures(data).slice(0, 10);
    return (
        <>
            <div className="slider">
                <div className="slider__header-container">
                    <h3>{title}</h3>
                    <div className="slider__controls-container">
                        <SliderControls containerId={id} cardCount={activities.length} />
                    </div>
                </div>
                <div id={id} className="slider__content">
                    {activities.map((item, index) => {
                        const slideData = {
                            _id: item.id,
                            title: item.name,
                            image: item.pictures[0],
                            price: item.price,
                            minimumDuration: item.minimumDuration,
                            description: item.description,
                            index: index
                        };
                        return <SliderCard key={index} {...slideData} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default Slider;
