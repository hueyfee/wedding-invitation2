export function getAnimationLayout(width, height){

    const mobile = width <= 768;

    return{

        mobile,

        closedY:
            mobile
                ? height * 0.08
                : 170,

        openingY:
            mobile
                ? height * 0.02
                : 60,

        pulloutY:
            mobile
                ? -height * 0.03
                : -120,

        focusY:
            mobile
                ? -height * 0.06
                : -170,

        cardScale:
            mobile
                ? Math.min(
                    height / 340,
                    2.9
                )
                : 4.6,

        rotate:
            mobile
                ? -5
                : -8

    };

}