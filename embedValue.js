import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

if (ExecutionEnvironment.canUseDOM) {
  //  Load Web3Go bot config as soon as site loads in the browser.
  window.dinChatbotConfig = {
    token: "F03vpUuT3em6KopZ",
    api: "https://reiki.web3go.xyz/aiweb",
  };
}