ssh -i ~/.ssh/common-listener.pem ubuntu@ec2-3-23-162-232.us-east-2.compute.amazonaws.com << EOF
    set -e
    cd common-listener-staging
    git checkout staging
    git pull
    ./env/env.sh -stg
    yarn
    yarn forever
EOF