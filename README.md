# REDIS PUB/SUB ARCHITECTURE POC

## An overview

In this repository I've discussed the redis's **pub/sub** architecture through some RESTful APIs. I've demonstrated that how we can use redis's pub/sub architecture to deliver high performant systems by offloading non-urgent tasks of system like sending **Welcome Emails**, **Account updates** to other asynchronous system's part called **subscriber.**

## Prerequistes

Please ensure that the following apps and services are already installed in your systems before begining the process.

1. Node.js
2. Postman
3. Git
4. Docker (for redis)
5. Redis Insights **(optional)**

## Repository setup

Please follow the following steps to setup this repository locally in your own system.

1. Open your workspace folder in your system's terminal and clone this repository by typing the following command

```sh
    git clone https://github.com/sahityagaurav4210/redis-pubsub-poc.git
```

2. Now after this, open this cloned repository in your favourite IDE like for example - **VS Code** etc.

3. Now make a file called **.env** into project's root directory structure and copy the following content into it.

```
PORT=3030
REDIS_URL=redis://localhost:6379
AUTH_USER=<your-email-id>
AUTH_PASSWORD=<your-email-id-password>
```

**Note: -** Please use your email id and its password here. For simplicity I've used my custom mail brought from hostinger.com.

4. After doing this basic setup now its time to install project's dependencies by running following commands onto the terminal.

```sh
    npm ci
    npm run build
```

**Note: -** In case after running **npm ci** command you face legacy dependencies issues then run either of the following command on the terminal to get the issue resolved.

```sh
    npm ci --f
    npm ci --legacy-peer-deps

    # Run either of the above command.
```

5. Now we've reached to end of repository setup process. Now run the following command on terminal to start the project.

```sh
    npm start
```

**Note: -** You should see **Server is running on port 3030.** message now on the terminal.

## Postman setup

After successful setup of the project open postman application in your system and create a collection in it and create following apis in it.

1. **[POST] http://localhost:3030/api/v1/send/email**

```json
// Payload

{
  "email": "works.sahitya@gmail.com",
  "message": "Hi, I am Gaurav Sahitya."
}
```

2. **[POST] http://localhost:3030/api/v1/send/otp**

```json
// Payload
{
  "email": "works.sahitya@gmail.com",
  "name": "Gaurav",
  "time": "10",
  "otp": "568712"
}
```

## Testing

After this postman setup, now run these two above apis one by one. When you'll run the first api you'll receive an email having subject line - **Welcome on-board** after few seconds, while the second api sends an email having subject line as **Verify your identity**.

**Note: -** Please notice the response time of both apis. You'll notice that even their response times is low you're receiving the email after couple of seconds or even minute. This proves that the time taking process, sending an email in this case has been successfully offloaded to an asynchronous part called subscriber which is doing its task in a separated environment without waiting the user to a longer period of time. This lays our foundation of creating **fast** and **performant** systems.

## About me

Hi, my name is gaurav sahitya. I am a software developer having more than 3 years of experience in creating software systems targeting both private and government sectors such as **EarthLink**, **ORGI, MHA, GoI** etc. Currently, I am working as a frontend developer at Centre for Development of Advanced Computing (C-DAC), Meity, GoI. For more information, please visit my [website](https://www.sgaurav.me).

                                ****
