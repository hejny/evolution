export function randomIndex(elements: any[]): number {
    return Math.floor(Math.random() * elements.length);
}

export function randomElement<T>(elements: T[]): T {
    const i = randomIndex(elements);
    //console.log(elements, i);
    return elements[i];
}

// TODO: Multiple choise
