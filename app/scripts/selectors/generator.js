import { createSelector } from 'reselect';
import { PasswordGenerator } from 'util/generators/password-generator';

const getStateActivePreset = state => state.generator.activePreset;
const getStateOptions = state => state.generator.options;
const getBuiltinPresets = state => state.generator.builtinPresets;
const getSettingsPresets = state => state.settings.generatorPresets;
const getStateVersion = state => state.generator.version;

const lengthMap = [
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    22,
    24,
    26,
    28,
    30,
    32,
    48,
    64,
];

function lengthToPseudoValue(length) {
    for (let ix = 0; ix < lengthMap.length; ix++) {
        if (lengthMap[ix] >= length) {
            return ix;
        }
    }
    return lengthMap.length - 1;
}

export function lengthFromPseudoValue(pseudoValue) {
    return lengthMap[pseudoValue];
}

export const getAllPresets = createSelector(
    [getBuiltinPresets, getSettingsPresets],
    (builtinPresets, settingsPresets) => {
        let presets = builtinPresets;
        if (settingsPresets) {
            if (settingsPresets.user) {
                presets = presets.concat(settingsPresets.user);
            }
            if (settingsPresets.disabled) {
                presets = presets.map(preset => {
                    if (settingsPresets.disabled[preset.name]) {
                        return { ...preset, disabled: true };
                    }
                    return preset;
                });
            }
        }
        return presets;
    }
);

export const getEnabledPresets = createSelector(
    [getAllPresets],
    allPresets => {
        return allPresets.filter(preset => !preset.disabled);
    }
);

export const getActivePreset = createSelector(
    [getStateActivePreset, getSettingsPresets, getEnabledPresets, getStateOptions],
    (stateActivePreset, getSettingsPresets, presets, stateOptions) => {
        if (stateOptions) {
            return undefined;
        }
        if (stateActivePreset) {
            const activePreset = presets.find(preset => preset.name === stateActivePreset);
            if (activePreset) {
                return activePreset;
            }
        }
        if (getSettingsPresets && getSettingsPresets.default) {
            const activePreset = presets.find(preset => preset.name === stateActivePreset);
            if (activePreset) {
                return activePreset;
            }
        }
        return presets[0];
    }
);

export const getActivePresetName = createSelector(
    [getActivePreset],
    activePreset => {
        return activePreset ? activePreset.name : undefined;
    }
);

export const getGeneratorOptions = createSelector(
    [getActivePreset, getStateOptions],
    (activePreset, stateOptions) => {
        const opt = stateOptions || activePreset;
        const pseudoLength = lengthToPseudoValue(opt.length);
        return { ...opt, pseudoLength };
    }
);

export const getGeneratedPassword = createSelector(
    [getGeneratorOptions, getStateVersion],
    options => {
        return PasswordGenerator.generate(options);
    }
);
