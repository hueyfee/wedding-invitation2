import "./AILoading.css";

export default function AILoading() {
    return (
        <div className="ai-loading-overlay">
            <div className="loader"></div>

            <h2>✨ Preparing your little surprise...</h2>

            <p>
                We're adding a touch of wedding magic just for you.
                <br />
                It will be ready in about 1 minute....
            </p>
        </div>
    );
}