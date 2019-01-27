const camelCaseRegex = /-./g;

export function camelCase(str) {
    return str.replace(camelCaseRegex, match => match[1].toUpperCase());
}
