ssh -i ~/.ssh/common-listener.pem ubuntu@ec2-3-23-162-232.us-east-2.compute.amazonaws.com << EOF
    cd common-listener
    git pull
    yarn
    yarn forever
EOF



