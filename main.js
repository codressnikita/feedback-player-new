const { app, BrowserWindow } = require("electron");
const path = require("path");
const { exec } = require("child_process");

let mainWindow;
let serverProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // Ensure you have a preload.js file if required
    },
  });

  // Load the Next.js standalone server URL
  mainWindow.loadURL("http://localhost:3000");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  // Start the standalone Next.js server
  const serverPath = path.join(__dirname, ".next/standalone/server.js");

  console.log("Starting Next.js standalone server...");
  serverProcess = exec(`node ${serverPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting server: ${error.message}`);
      app.quit();
      return;
    }
    if (stderr) {
      console.error(`Server stderr: ${stderr}`);
    }
    console.log(`Server stdout: ${stdout}`);
  });

  // Give the server some time to start, then create the Electron window
  setTimeout(() => {
    console.log("Creating main window...");
    createWindow();
  }, 3000); // Adjust delay based on your server startup time
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("quit", () => {
  // Clean up the Next.js server process when Electron quits
  if (serverProcess) {
    console.log("Killing Next.js server process...");
    serverProcess.kill();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
