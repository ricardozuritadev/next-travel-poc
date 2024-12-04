"use client";

type SliderControlsProps = {
    id: string;
};

const SliderControls: React.FC<SliderControlsProps> = ({ id }) => {
    //gets the direcction where the slider should move
    const moveSlider = (direction: number) => {
        const selectedItem = document.querySelector(`#${id} .selected`);
        const allItems = [...document.querySelectorAll(`#${id} .slider-card`)];
        const currentIndex = allItems.indexOf(selectedItem!); // the ! is used to tell TS that the value is not null

        if (
            (currentIndex === 0 && direction === -1) ||
            (currentIndex === allItems.length - 1 && direction === 1)
        ) {
            return; // No movement if already at the edge
        }

        selectedItem!.classList.remove("selected");
        allItems[currentIndex + direction].classList.add("selected");
        scrollToSliderContainer(currentIndex + direction);
    };

    const scrollToSliderContainer = (index: number) => {
        const allItems = [...document.querySelectorAll(`#${id} .slider-card`)];
        const containerParent = document.querySelector(`#${id}`);

        if (!containerParent || !allItems.length) return;

        // Get the width of the card and the gap between them
        const cardWidth = allItems[0].clientWidth;
        const computedStyles = window.getComputedStyle(containerParent);
        const gapValue = parseFloat(computedStyles.gap);

        // Calculate offset for scrolling
        const offsetLeft = index * (cardWidth + gapValue);

        // Scroll the container
        containerParent.scrollTo({
            left: offsetLeft,
            behavior: "smooth"
        });

        // Update button states
        const containerId = document.querySelector(`#${id}`);
        const buttons = containerId!.parentElement!.querySelectorAll(`.controls__button`);
        buttons.forEach((button) => {
            if (button.classList.contains("prev")) {
                button.classList.toggle("disabled", index === 0); // Disable if at the first item
            } else if (button.classList.contains("next")) {
                // Disable if all visible cards are the last ones
                const visibleCards = Math.floor(
                    containerParent.clientWidth / (cardWidth + gapValue)
                );
                button.classList.toggle("disabled", index + visibleCards >= allItems.length - 1);
            }
        });
    };

    return (
        <div className="controls">
            <button className="controls__button prev disabled" onClick={() => moveSlider(-1)}>
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
            <button className="controls__button next" onClick={() => moveSlider(1)}>
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
