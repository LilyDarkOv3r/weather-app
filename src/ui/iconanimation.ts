const cycleicon = document.querySelector("#cycleicon") as HTMLDivElement;

export function startAnimation() {
    cycleicon.animate([
        {
            transform:"translateX(40px)",
            opacity: 0
        },
        {
            transform:"translateX(0)",
            opacity: 1
        }
    ],
    {
        duration: 500,
        easing: "ease"
    }
)};
