const styleDef = {
    cardBase: [
        "padding-top: 0.5em",
        "padding-bottom: 0.5em",
        "text-decoration-skip-ink: none",
        "margin-top: 0.2em",
        "margin-bottom: 0.2em",
    ],
    bigCard: [
        "text-align: center",
        "font-size: 32px",
        "font-weight: bold"
    ],
    smallCard: [
        "font-size: 20px",
        "text-indent: 0.5em",
    ],
    blueBackground: [
        "background-color: var(--b3-card-info-background)",
        "border: 1px solid var(--b3-card-info-background)"
    ],
    brownBackground: [
        "background-color: var(--b3-font-background3)",
        "border: 1px solid var(--b3-font-background3)"
    ],
    greenBackground: [
        "background-color: var(--b3-card-success-background)",
        "border: 1px solid var(--b3-card-success-background)"
    ],
    orangeBackground: [
        "background-color: var(--b3-font-background4)",
        "border: 1px solid var(--b3-font-background4)"
    ],
    purpleBackground: [
        "background-color: var(--b3-font-background10)",
        "border: 1px solid var(--b3-font-background10)"
    ],
    redBackground: [
        "background-color: var(--b3-card-error-background)",
        "border: 1px solid var(--b3-card-error-background)"
    ],
    yellowBackground: [
        "background-color: var(--b3-card-warning-background)",
        "border: 1px solid var(--b3-card-warning-background)"
    ],
    blueText: [
        "color: var(--b3-card-info-color)"
    ],
    brownText: [
        "color: var(--b3-font-color3)"
    ],
    greenText: [
        "color: var(--b3-card-success-color)"
    ],
    orangeText: [
        "color: var(--b3-font-color4)"
    ],
    purpleText: [
        "color: var(--b3-font-color10)"
    ],
    redText: [
        "color: var(--b3-card-error-color)"
    ],
    yellowText: [
        "color: var(--b3-card-warning-color)"
    ],
    outline: [
        "border: 1px solid rgb(from var(--b3-card-info-color) r g b / 40%)"
    ],

    slimSuperBlock: [
        "width: 100%",
        "padding: 0px",
        "margin: 0px",
    ],

    slimEmbeddedBlock: [
        "width: 100%",
        "padding: 0px",
        "margin: 0px",
        "background: transparent"
    ]
};

const composeStyles = (...styleGroups: string[][]) =>
    styleGroups.flat().join('; ') + ';';

export const buttonConfigs = [
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.bigCard,
            styleDef.blueBackground,
            styleDef.blueText
        ),
        label: "bigFullBlue"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.bigCard,
            styleDef.greenBackground,
            styleDef.greenText
        ),
        label: "bigFullGreen"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.bigCard,
            styleDef.redBackground,
            styleDef.redText
        ),
        label: "bigFullRed"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.bigCard,
            styleDef.yellowBackground,
            styleDef.yellowText
        ),
        label: "bigFullYellow"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.bigCard,
            styleDef.outline
        ),
        label: "bigNoBackgroundOutline"
    },
    {
        value: "separator",
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.smallCard,
            styleDef.blueBackground
        ),
        label: "smallBlueBackground"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.smallCard,
            styleDef.greenBackground
        ),
        label: "smallGreenBackground"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.smallCard,
            styleDef.redBackground
        ),
        label: "smallRedBackground"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.smallCard,
            styleDef.yellowBackground
        ),
        label: "smallYellowBackground"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.smallCard,
            styleDef.outline
        ),
        label: "smallNoBackgroundOutline"
    },
    {
        value: "separator",
    },
    {
        value: composeStyles(
            styleDef.slimSuperBlock,
        ),
        label: "slimSuperBlock"
    },
    {
        value: composeStyles(
            styleDef.slimEmbeddedBlock,
        ),
        label: "slimEmbeddedBlock"
    },
]

export const buttonConfigsAsri = [
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.bigCard,
            styleDef.brownBackground,
            styleDef.brownText
        ),
        label: "bigFullBrown"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.bigCard,
            styleDef.orangeBackground,
            styleDef.orangeText
        ),
        label: "bigFullOrange"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.bigCard,
            styleDef.purpleBackground,
            styleDef.purpleText
        ),
        label: "bigFullPurple"
    },
    {
        value: "separator",
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.smallCard,
            styleDef.brownBackground
        ),
        label: "smallBrownBackground"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.smallCard,
            styleDef.orangeBackground
        ),
        label: "smallOrangeBackground"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.smallCard,
            styleDef.purpleBackground
        ),
        label: "smallPurpleBackground"
    },
];
