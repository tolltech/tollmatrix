function SendMessageToExtension(eventType, payload, callback) {
    chrome.runtime.sendMessage({ type: eventType, payload: payload }, callback);
}

function SendMessageToCurrentActiveTab(eventType, payload, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: eventType, payload: payload }, callback);
    });
}

function AddEventListener(eventType, action) {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (!request.type || request.type != eventType) {
                return;
            }

            action(request.payload);
        });
}

const storageKey = "tollmatrix_report_key";
const storage = chrome.storage && chrome.storage.local;

async function getReportFromStorage() {
    const obj = await storage.get();
    return obj[storageKey];
}

async function saveReportToStorage(report) {
    const obj = {};
    obj[storageKey] = report;

    await storage.set(obj);
};