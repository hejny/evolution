// TODO: Multiple choise
export function randomElement<T>(elements: T[]): T {
    const i = Math.floor(Math.random() * elements.length);
    console.log(elements, i);
    return elements[i];
}
