module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "ie": 11
                }
            }
        ],
        "@babel/preset-react",
        "@babel/typescript"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/proposal-object-rest-spread",
    ]
}
