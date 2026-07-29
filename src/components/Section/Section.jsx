import "./Section.css";

function Section({ title, subtitle, children }) {

    return (

        <section className="section">

            {subtitle && (

                <p className="section-subtitle">

                    {subtitle}

                </p>

            )}

            {title && (

                <h2 className="section-title">

                    {title}

                </h2>

            )}

            <div className="section-content">

                {children}

            </div>

        </section>

    );

}

export default Section;