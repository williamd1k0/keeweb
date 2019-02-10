import getDefaultState from 'store/generator/init';

export const type = 'generator/reset-generator';

export function resetGenerator() {
    return { type };
}

export default function reducer() {
    return getDefaultState();
}
