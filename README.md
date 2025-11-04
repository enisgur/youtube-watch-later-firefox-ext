# My Firefox Extension

This is a boilerplate for a Firefox extension.

## Getting Started

1.  **Load the extension in Firefox:**
    *   Open Firefox and navigate to `about:debugging`.
    *   Click on "This Firefox".
    *   Click on "Load Temporary Add-on...".
    *   Select the `manifest.json` file.

2.  **See the output:**
    *   Open any website.
    *   Open the browser's developer tools (press F12 or Ctrl+Shift+I).
    *   Go to the "Console" tab. You should see the message "Hello from my Firefox Extension!".

## Project Structure

*   **`manifest.json`**: This is the most important file. It tells Firefox about your extension, including its name, version, and what it can do. In this boilerplate, it's configured to load a content script on all websites.

*   **`content_scripts/main.js`**: This is a content script. Content scripts are JavaScript files that run in the context of a web page. The boilerplate script simply logs a message to the browser's console.

## Next Steps

From here, you can start building your own extension. Here are some ideas:

*   **Modify the content script:** Change `content_scripts/main.js` to interact with the web page content.
*   **Add a background script:** Create a `background.js` file and add it to your `manifest.json`. Background scripts run in the background and are useful for managing the extension's state and handling events.
*   **Add a browser action:** Add a button to the Firefox toolbar by adding a `browser_action` to your `manifest.json`.
*   **Add a page action:** Add an icon to the address bar on specific pages by adding a `page_action` to your `manifest.json`.

You can find more information about developing Firefox extensions on the Mozilla Developer Network (MDN): [https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
