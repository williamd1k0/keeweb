export function plural(num, singular, plural) {
    return `${num} ${num === 1 ? singular : plural}`;
}
