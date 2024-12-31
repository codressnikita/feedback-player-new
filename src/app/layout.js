import React from "react";
import "./globals.css";

// This layout component runs on the server and can safely access the filesystem
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
        />
      </head>
      <body>{React.cloneElement(children)}</body>
    </html>
  );
}
