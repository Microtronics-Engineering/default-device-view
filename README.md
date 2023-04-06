This template should help get you started developing a custom frontend for your device.
It is based on [Vue 3](https://vuejs.org/) + [Vuetify 3](https://next.vuetifyjs.com/en/) + [Vite](https://vitejs.dev/)

### Environment

Edit the [.env.development](.env.development) file and insert your API Token and the ID of your device.
 - Find your device ID from the [Portal](https://portal.microtronics.one)
 - Get your API Token [here](https://docs.microtronics.one/articles/26#generate-an-api-token)

The file should look something like this:
````
VITE_API_TOKEN="Tzo2MmE1Y2E4N2QyMTdlNTlmNUM4ZWQyYjU6MTY3MDI0Mzk2NTYyMjpmYTFjZDM5Yi1jZmYyLTRhNzYtODg1NS00MDc3ODRiMzcwYjg="
VITE_DEVICE_ID="4B7F3F2391ABDB1F"
````

### Setup

Make sure you have an up-to-date version of [Node.js](https://nodejs.org/en/) installed, then run the following commands 
in your command line:

````
npm install
npm run dev
```` 

You should now have your first project running!

When you are ready to ship your app to production, run the following:  
````
npm run build
````
This will create a production-ready build of your app in the project's ``./dist`` directory.

Next open your Studio project and change the POV settings to **External Source** and select the dist folder.
This will copy all assets from your dist folder into the studio project. 
Afterwards you can create a new tag and deploy the new interface to your devices.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
