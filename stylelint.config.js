module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
    ignoreFiles: [
        '**/*.ts',
        '**/*.tsx',
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.gif',
        '**/*.mp3',
        '**/*.json'
    ],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['extends', 'ignores']
            }
        ],
        indentation: 4,
        'number-leading-zero': null,
        'unit-allowed-list': ['em', 'rem', 's', 'px', 'deg', 'all', 'vh', '%'],
        'no-eol-whitespace': [
            true,
            {
                ignore: 'empty-lines'
            }
        ],
        'declaration-block-trailing-semicolon': 'always',
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global']
            }
        ],
        'block-closing-brace-newline-after': 'always',
        'declaration-block-semicolon-newline-after': 'always',
        'no-descending-specificity': null,
        'selector-list-comma-newline-after': 'always',
        'selector-pseudo-element-colon-notation': 'single'
    }
};
