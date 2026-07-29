function TimelineCurve() {
    return (
        <svg
            className="timeline-svg"
            viewBox="0 0 220 3000"
            preserveAspectRatio="none"
        >
            <path
                d="
                    M110 0

                    C180 120 40 260 110 420

                    C180 620 40 820 110 1040

                    C180 1240 40 1440 110 1660

                    C180 1860 40 2060 110 2280

                    C180 2480 40 2680 110 2820

                    C135 2890 118 2940 110 2980

                    C108 2990 109 2995 110 3000
                "
                fill="none"
                stroke="#C4D8E8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

<circle cx="110" cy="60" r="5" fill="#AFC7DB"/>
            <circle cx="150" cy="580" r="5" fill="#AFC7DB"/>
            <circle cx="80" cy="1100" r="5" fill="#AFC7DB"/>
            <circle cx="140" cy="1620" r="5" fill="#AFC7DB"/>
        </svg>
    );
}

export default TimelineCurve;

