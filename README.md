# Common Listener

This repository defined a number of processes that listen to changes in graphql and update the firebase data accordingly.

# How to run
To run locally, enter into your terminal in the common-listener directory
```
yarn
yarn start 
```


# Deployment

You need the `.pem` file. Once you have it, login with:

```ssh -i ~/.ssh/common-listener.pem ubuntu@ec2-3-23-162-232.us-east-2.compute.amazonaws.com```

And do the following:

```
cd common-listener
git pull
yarn
yarn forever # will restart the process
```

For troubleshooting, check the files `./out.log` and `./error.log` (in the current directory) and
```
yarn forever-cmd logs
```
Also:
```
yarn forever-cmd list # list the currently running processes
```




