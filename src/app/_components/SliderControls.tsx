"use client";
import { useRef, useEffect } from "react";

type SliderControlsProps = {
    containerId: string; // ID of the slider container
    cardCount: number; // Total number of cards
};

const SliderControls: React.FC<SliderControlsProps> = ({ containerId, cardCount }) => {
    const controlsRef = useRef<HTMLDivElement>(null); // Ref for the controls container
    const sliderContainer = useRef<HTMLElement | null>(null); // Ref for the activitiesSlider container

    // Get the slider container by ID after mount
    useEffect(() => {
        sliderContainer.current = document.getElementById(containerId);
    }, [containerId]);

    const moveSlider = (direction: number) => {
        const container = sliderContainer.current;
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
        const test = controlsRef.current?.offsetParent?.children;

        const mainContainer = console.log(test);
        const prevButton = controlsRef.current?.querySelector(".controls__button.prev");
        const nextButton = controlsRef.current?.querySelector(".controls__button.next");
        const visibleCards = sliderContainer.current
            ? Math.floor(sliderContainer.current.clientWidth / (cardWidth + gapValue))
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
/*
const SliderControls: React.FC<SliderControlsProps> = ({ containerId }) => {
    //gets the direcction where the slider should move
    const containerRef = useRef<HTMLDivElement>(null);
    const moveSlider = (direction: number) => {
        if (containerRef.current) {
            console.log("current", containerRef.current);
            console.log("containerRef", containerRef);
        }
        const selectedItem = document.querySelector(`#${containerId} .selected`);
        const allItems = [...document.querySelectorAll(`#${containerId} .slider-card`)];
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
        const allItems = [...document.querySelectorAll(`#${containerId} .slider-card`)];
        const containerParent = document.querySelector(`#${containerId}`);

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
        const containerId = document.querySelector(`#${containerId}`);
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
        <div className="controls" ref={containerRef}>
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
*/
export default SliderControls;
