import "./TimelineItem.css";

function TimelineItem({
    time,
    title,
    description,
    icon,
    side,
    iconSize = 70,
    iconTop = 0,
}) {
    return (
        <div className={`timeline-item ${side}`}>

            {/* Text */}

            <div className="timeline-content">

                <span className="timeline-time">
                    {time}
                </span>

                <h3>{title}</h3>

                <p>{description}</p>

            </div>

            {/* Illustration */}

            <div
                className="timeline-illustration"
                style={{
                    top: `${60 + iconTop}px`,
                }}
            >
                <div className="illustration-bg"></div>

                <img
                    src={icon}
                    alt={title}
                    style={{
                        width: `${iconSize}px`,
                        height: "auto",
                    }}
                />

            </div>

            {/* Decorations */}

            <span className="flower flower1">❀</span>
<span className="flower flower2">❀</span>
<span className="flower flower3">❀</span>
<span className="flower flower4">❀</span>
<span className="flower flower5">❀</span>
<span className="flower flower6">❀</span>
<span className="flower flower7">❀</span>
<span className="flower flower8">❀</span>

        </div>
    );
}

export default TimelineItem;