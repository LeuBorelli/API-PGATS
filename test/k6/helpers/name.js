let nameCounter = 0;

export function generateRandomName() {
    const timestamp = Date.now();
    nameCounter += 1;

    return `user_${timestamp}_${nameCounter}`;
}
