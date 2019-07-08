// TODO: Multiple choise
export function randomElement<T>(elements: T[]): T {
    const i = Math.floor(Math.random() * elements.length);
    return elements[i];
}
