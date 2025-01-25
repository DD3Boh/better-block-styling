const styleDef = {
    cardBase: [
        "width: 99%",
        "align-self: center",
        "padding-top: 0.5em",
        "padding-bottom: 0.5em",
        "text-decoration-skip-ink: none",
    ],
    smallCard: [
        "font-size: 20px",
        "text-indent: 0.5em",
    ],
    bigCard: [
        "text-align: center",
        "font-size: 32px",
        "font-weight: bold"
    ],
    outline: [
        "border: 1px solid rgb(from var(--b3-card-info-color) r g b / 40%)"
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
            styleDef.bigCard,
            styleDef.outline
        ),
        label: "bigNoBackgroundOutline"
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
];
