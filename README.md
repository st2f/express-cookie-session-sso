before running the project
```bash
npm i
npm start
```
you need to setup these variables in config/.env
![Screenshot from 2025-06-08 15-35-12](https://github.com/user-attachments/assets/b10b05e6-025f-4075-85f0-2211b5b9851d)



# Google SSO

this uses [Google OAuth2 API, v2](https://developers.google.com/identity/protocols/oauth2/scopes#oauth2)

you will need to create a project in the [google cloud console page](https://console.developers.google.com)

and obtain a GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

![sso-google](https://github.com/user-attachments/assets/0ca86045-19a4-4132-a931-58944eadca3e)

![sso-google2](https://github.com/user-attachments/assets/fd0a56c0-e5a7-4108-9d40-d71f465c0253)

# session storage

this uses MongoDB to store session

you will need to get connection such as 

`MONGODB_URL_CONNECTION=mongodb+srv://user-here:password-here@host-here/db-name-here?appName=Cluster0`

[you can get a free MongoDB Atlas account](https://account.mongodb.com/account/login)

![mongodb-session](https://github.com/user-attachments/assets/75eb9356-2be6-4aff-b700-3745fa37a2e4)

