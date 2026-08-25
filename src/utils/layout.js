export function getLayout(width, height) {

    const mobile = width <= 768;

    return {

        mobile,

        envelope: {

            width: mobile
                ? Math.min(width * 0.82, 360)
                : 700,

            left: mobile ? 0.50 : 0.15,

            top: mobile ? 0.53 : 0.12

        },

        invitation: {

            width: mobile
                ? Math.min(width * 0.48, 210)
                : 400,

            left: mobile ? 0.26 : 0.35,

            top: mobile ? 0.14 : 0.08

        }

    };

}