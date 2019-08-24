# Flexify

[![Netlify Status](https://api.netlify.com/api/v1/badges/5975f310-56ef-425e-9a8a-211df1b2fb66/deploy-status)](https://app.netlify.com/sites/flexify-manager/deploys)


<img src="./media/flexify.svg" width="400">



## Project setup :wrench:
*For being able to run the development environment, you are expected to have installed the latest version of Docker Compose*

### Preparing dev environment

A bash script has been created to populate a dummy database and set up the necessary aspects to be able to run a demo.

```
./init.prod.sh
>> Follow the instructions to create a Django super user
```
### Launching a demo setup
Once this setup is due, it is possible to run a demo of the whole environment by launching the second script: 

```
./demo.sh
>> For shutting down the docker containers, please use docker-compose -f docker-compose.prod.yml down
```
