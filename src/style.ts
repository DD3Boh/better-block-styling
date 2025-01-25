export const cardStyles = {
    card: [
      "text-align: center",
      "padding-bottom: 10px",
      "font-size: 32px",
      "font-weight: bold",
      "width: 100%",
      "min-height: 5vh",
      "flex: 0 0 auto"
    ].join("; ") + ";",

    cardGreen: [
        "background-color: var(--b3-card-success-background)",
        "color: var(--b3-card-success-color)"
    ].join("; ") + ";",

    cardRed: [
      "background-color: var(--b3-card-error-background)",
      "color: var(--b3-card-error-color)"
    ].join("; ") + ";",

    cardYellow: [
      "background-color: var(--b3-card-warning-background)",
      "color: var(--b3-card-warning-color)"
    ].join("; ") + ";",
};

export const buttonConfigs = [
    {
        value: cardStyles.card + cardStyles.cardGreen,
        label: "green"
    },
    {
        value: cardStyles.card + cardStyles.cardRed,
        label: "red"
    },
    {
        value: cardStyles.card + cardStyles.cardYellow,
        label: "yellow"
    },
];