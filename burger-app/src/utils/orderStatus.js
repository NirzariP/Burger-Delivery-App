export function getOrderStatus(placedAt) {
    const placedTime = new Date(placedAt).getTime();
    const now = Date.now();
    const secondsElapsed = (now-placedTime) / 1000;

    if (secondsElapsed < 30) return "Cooking";
    if (secondsElapsed < 60) return "Out for Delivery";
    return "Delivered";
}