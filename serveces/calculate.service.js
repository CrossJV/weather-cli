export async function getCardinalDirection(angle) {
    const directions = ['↑ С', '↗ СВ', '→ В', '↘ ЮВ', '↓ Ю', '↙ ЮЗ', '← З', '↖ СЗ'];
    return directions[Math.round(angle / 45) % 8];
}