---
title: Get Started - SpaceID
---

# Get Started - SpaceID

## How to Resolve a Name Using the Space ID SDK

### Step 1: Setup Your Project
1. Install Node.js and npm
Ensure you have Node.js and npm installed. You can download them from Node.js official website.

2. Create a New Project
Open your terminal and create a new project directory:

```bash
mkdir spaceid-tutorial
cd spaceid-tutorial
npm init -y
```
3. Install the Space ID SDK
Install the Space ID SDK package using npm:

```bash
Copy code
npm install @spaceid/sdk
```

### Step 2: Write the Code to Resolve a Name
1. Create a JavaScript File
Create a file named `resolveName.js` in your project directory.

2. Import the Space ID SDK
At the top of `resolveName.js`, import the Space ID SDK:

```javascript
const { SpaceID } = require('@spaceid/sdk');
```
3. Initialize the Space ID SDK
Initialize the SDK with the necessary parameters:

```javascript
const spaceId = new SpaceID({
    endpoint: 'https://api.spaceid.io', // API endpoint
    apiKey: 'your_api_key' // Replace with your actual API key
});
```

4. Resolve a Name
Write a function to resolve a name using the SDK:

```javascript
async function resolveName(name) {
    try {
        const result = await spaceId.resolveName(name);
        console.log(`Address for ${name}: ${result.address}`);
    } catch (error) {
        console.error('Error resolving name:', error);
    }
}
```

5. Call the Function
Call the `resolveName` function with a sample name:

```javascript
resolveName('example.eth');
```

### Step 3: Run the Code
1. Run the Script
In your terminal, run the script:

```bash

node resolveName.js
```
2. View the Result
If everything is set up correctly, you should see the resolved address for the provided name in the terminal output.

## Example Code
Here’s the complete code for resolveName.js:

```javascript

const { SpaceID } = require('@spaceid/sdk');

const spaceId = new SpaceID({
    endpoint: 'https://api.spaceid.io',
    apiKey: 'your_api_key'
});

async function resolveName(name) {
    try {
        const result = await spaceId.resolveName(name);
        console.log(`Address for ${name}: ${result.address}`);
    } catch (error) {
        console.error('Error resolving name:', error);
    }
}

resolveName('example.eth');
```
Replace 'your_api_key' with your actual API key and 'example.eth' with the name you want to resolve. You can read more in this [blog](https://nodereal.io/blog/en/how-to-resolve-a-name-through-spaceid-sdk/).
