ssh -i ~/.ssh/common-listener.pem ubuntu@ec2-3-23-162-232.us-east-2.compute.amazonaws.com << EOF
    set -e
    cd common-listener
    git checkout master
    git pull
    ./env/env.sh -prod
    yarn
    yarn forever
EOF