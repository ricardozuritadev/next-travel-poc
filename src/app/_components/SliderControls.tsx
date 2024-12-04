// Desc: Slider controls for the slider
const SliderControls = () => {
    return (
        <div className="controls">
            <button className="controls__button disabled">
                <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="button-arrow"
                >
                    <path
                        d="M8.5 1L1.5 8L8.5 15"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <button className="controls__button">
                <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="button-arrow"
                >
                    <path
                        d="M1.5 1L8.5 8L1.5 15"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SliderControls;
