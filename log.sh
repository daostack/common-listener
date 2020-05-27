ssh -i ~/.ssh/common-listener.pem ubuntu@ec2-3-23-162-232.us-east-2.compute.amazonaws.com << EOF
    tail -f /home/ubuntu/.forever/common-listener.log -n 100 -n 100
EOF



