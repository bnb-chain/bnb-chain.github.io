document.addEventListener("DOMContentLoaded", () => {
    // Load the Inkeep script
    const inkeepScript = document.createElement("script");
    inkeepScript.src = "https://unpkg.com/@inkeep/cxkit-js@0.5.67/dist/embed.js";
    inkeepScript.type = "module";
    inkeepScript.defer = true;
    document.head.appendChild(inkeepScript);

    // Configure and initialize the widget
    const addInkeepWidget = () => {
        const inkeepWidget = Inkeep.ChatButton({
            baseSettings: {
                env: "production",
                apiKey: "40582708b8a0305555fa91c049bb0dfa4e192337819bd03c", // required - replace with your own API key
                primaryBrandColor: "#fbc828", // your brand color, widget color scheme is derived from this
                organizationDisplayName: "BNBChain",
                // ...optional settings
                colorMode: {
                    forcedColorMode: "dark",
                },
                theme: {
                    styles: [
                        {
                            key: "custome-theme",
                            type: "style",
                            value: `
                                :root {
                                    font-size: 16px;
                                }
                                .ikp-markdown-link {
                                    color: #fbc828;
                                    text-decoration: underline;
                                }
                                .ikp-chat-button__container .ikp-chat-button__button {
                                    font-size: 16px;
                                    padding: 8px 16px;
                                    height: 48px;
                                }
                                .ikp-chat-button__container .ikp-chat-button__avatar-image{
                                    width: 24px;
                                    height: 24px;
                                }
                                  `,
                        },
                    ],
                },
                onEvent: (event) => {
                    // analytics.track(event.eventName, event.properties);
                    if (
                        event.eventName === "modal_opened" &&
                        event.properties?.componentType === "ChatButton"
                    ) {
                        window.dataLayer?.push({ event: "click_AiBot_floatBtn" });
                    }
                },
            },
            aiChatSettings: {
                aiAssistantName: "BNB Chain AI",
                aiAssistantAvatar: `https://static.bnbchain.org/home-ui/static/images/logo.svg`,
                introMessage: `Yo dev!\nI'm your AI-powered sidekick for all things BNB Chain — smart contracts, SDKs, RPCs, you name it.`,
                disclaimerSettings: {
                    isEnabled: true,
                    label: 'Disclaimer',
                    tooltip:
                        'My answers might not always be 100% accurate. Double-check when in doubt. <a target="_blank" href="/en/ai-bot-disclaimer">Learn More<a>',
                },
                exampleQuestions: [
                    "How to deploy a BEP-20 token on BSC?",
                    "How to write a contract on opBNB?",
                    "How to use Greenfield for file storage?",
                    "Where can I find funding or grants?",
                ],
            },
        });
    };

    inkeepScript.addEventListener("load", () => {
        addInkeepWidget(); // initialize the widget
    });
});