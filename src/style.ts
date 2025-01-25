const styleDef = {
    cardBase: [
        "text-align: center",
        "font-weight: bold",
        "width: 100%",
    ],
    smallCard: [
        "font-size: 20px",
        "min-height: 4vh",
        "padding-top: 1.2vh",
    ],
    bigCard: [
        "font-size: 32px",
        "font-weight: bold",
        "min-height: 5vh",
        "padding-bottom: 1vh",
    ],
    blueBackground: [
        "background-color: var(--b3-card-info-background)"
    ],
    greenBackground: [
        "background-color: var(--b3-card-success-background)"
    ],
    redBackground: [
        "background-color: var(--b3-card-error-background)"
    ],
    yellowBackground: [
        "background-color: var(--b3-card-warning-background)"
    ],
    blueText: [
        "color: var(--b3-card-info-color)"
    ],
    greenText: [
        "color: var(--b3-card-success-color)"
    ],
    redText: [
        "color: var(--b3-card-error-color)"
    ],
    yellowText: [
        "color: var(--b3-card-warning-color)"
    ],
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
];
