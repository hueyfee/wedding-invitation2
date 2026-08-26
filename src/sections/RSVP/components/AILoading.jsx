import "./AILoading.css";

export default function AILoading() {
    return (
        <div className="ai-loading-overlay">

            <div className="sparkles">
                ✨
            </div>

            <div className="loader"></div>

            <h2>
                Creating Your
                <br />
                Wedding Surprise
            </h2>

            <p className="description">
                We're adding a touch of wedding magic
                <br />
                just for you.
            </p>

            <div className="loading-card">

                <p className="loading-text">
                    💌 This usually takes
                    <strong> 30–60 seconds</strong>
                </p>

                <p className="loading-note">
                    Please keep this page open.
                </p>

            </div>

        </div>
    );
}