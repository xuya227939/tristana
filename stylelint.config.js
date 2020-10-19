module.exports = {
    'extends': 'stylelint-config-standard',
    'ignoreFiles': ['**/*.js', '**/*.jsx', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.mp3', '**/*.json'],
    'rules': {
        'at-rule-no-unknown': [ true, {
            'ignoreAtRules': [
                'extends',
                'ignores'
            ]
        }],
        'indentation': 4,
        'number-leading-zero': null,
        'unit-whitelist': ['em', 'rem', 's', 'px', 'deg', 'all', 'vh', '%'],
        'no-eol-whitespace': [true, { 'ignore': 'empty-lines' }],
        'declaration-block-trailing-semicolon': 'always',
        'no-missing-end-of-source-newline': true,
        'selector-pseudo-class-no-unknown': [ true, {
            ignorePseudoClasses: ['global']
        }],
        'no-descending-specificity': null,
        'selector-list-comma-newline-after': 'always',
        'selector-pseudo-element-colon-notation': 'single'
    }
};