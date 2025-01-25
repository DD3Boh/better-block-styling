const styleDef = {
    cardBase: [
        "text-align: center",
        "font-weight: bold",
        "width: 100%",
        "flex: 0 0 auto"
    ],
    smallCard: [
        "font-size: 16px",
        "min-height: 4vh",
        "padding-top: 1.2vh",
    ],
    bigCard: [
        "font-size: 32px",
        "font-weight: bold",
        "min-height: 5vh",
        "padding-bottom: 1vh",
    ],
    fullBlue: [
        "background-color: var(--b3-card-info-background)",
        "color: var(--b3-card-info-color)"
    ],
    fullGreen: [
        "background-color: var(--b3-card-success-background)",
        "color: var(--b3-card-success-color)"
    ],
    fullRed: [
        "background-color: var(--b3-card-error-background)",
        "color: var(--b3-card-error-color)"
    ],
    fullYellow: [
        "background-color: var(--b3-card-warning-background)",
        "color: var(--b3-card-warning-color)"
    ]
};

const composeStyles = (...styleGroups: string[][]) =>
    styleGroups.flat().join('; ') + ';';

export const buttonConfigs = [
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.bigCard,
            styleDef.fullBlue
        ),
        label: "blue"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.bigCard,
            styleDef.fullGreen
        ),
        label: "green"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.bigCard,
            styleDef.fullRed
        ),
        label: "red"
    },
    {
        value: composeStyles(
            styleDef.cardBase,
            styleDef.bigCard,
            styleDef.fullYellow
        ),
        label: "yellow"
    },
];
