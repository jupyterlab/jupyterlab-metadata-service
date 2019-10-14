module.exports = {
  launch: {
    headless: process.env.HEADLESS !== "false"
  },
  // https://github.com/smooth-code/jest-puppeteer/tree/master/packages/jest-dev-server#options
  server: {
    command: "jupyter lab --port 8080 --no-browser",
    port: 8080
  }
};
