# Verify Code App
This app takes in up to 6 digits, and allows input via copy pasting.
Inputs are limited to numbers, and copy pasting a combination of letters and numbers
will automatically serialize it to just the numbers. Once submitted, it'll call the API.

If the API receives any input longer than 6, or invalid characters, it'll throw an
`INVALID_CODE` error, otherwise it'll return a success response with code `200`.

Once the API call succeeds, you'll be redirected to the success page.
If it fails, the Verification Page will display an error.

This project was made with Node, React, and ExpressJS.

## Usage
1. Install Node 10+
2. Clone the repository
3. Go to the project directory, and run `npm install`
4. To run the app in development mode, run `npm run start:dev`
5. To run the app in production mode, run `npm run start`.
6. Go to localhost:3000 for dev mode, and localhost:5000 for production mode on the browser.
