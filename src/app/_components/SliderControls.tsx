"use client";
import { useRef, useEffect } from "react";

type SliderControlsProps = {
    containerId: string; // ID of the slider container
    cardCount: number; // Total number of cards
};

const SliderControls: React.FC<SliderControlsProps> = ({ containerId, cardCount }) => {
    const controlsRef = useRef<HTMLDivElement>(null); // Ref for the controls container
    const sliderContainer = useRef<HTMLElement | null>(null); // Ref for the activitiesSlider container
    const container = controlsRef.current?.offsetParent?.querySelector(`#${containerId}`);

    const moveSlider = (direction: number) => {
        console.log("container", container);
        if (!container) return;

        const allItems = Array.from(container.children) as HTMLElement[];
        const selectedIndex = allItems.findIndex((item) => item.classList.contains("selected"));

        if (selectedIndex === -1) return;

        const newIndex = selectedIndex + direction;

        // Prevent out-of-bound navigation
        if (newIndex < 0 || newIndex >= cardCount) return;

        // Update selected class
        allItems[selectedIndex].classList.remove("selected");
        allItems[newIndex].classList.add("selected");

        // Scroll container
        const cardWidth = allItems[0].clientWidth;
        const computedStyles = window.getComputedStyle(container);
        const gapValue = parseFloat(computedStyles.gap || "0");
        const offset = newIndex * (cardWidth + gapValue);

        container.scrollTo({
            left: offset,
            behavior: "smooth"
        });

        // Update button states
        updateButtonStates(newIndex, cardWidth, gapValue);
    };

    const updateButtonStates = (index: number, cardWidth: number, gapValue: number) => {
        const prevButton = controlsRef.current?.querySelector(".controls__button.prev");
        const nextButton = controlsRef.current?.querySelector(".controls__button.next");
        const visibleCards = container
            ? Math.floor(container.clientWidth / (cardWidth + gapValue))
            : 0;
        if (prevButton) prevButton.classList.toggle("disabled", index === 0);
        if (nextButton)
            nextButton.classList.toggle("disabled", index + visibleCards >= cardCount - 1);
    };

    return (
        <div className="controls" ref={controlsRef}>
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
