
# TICKET SCRAPER project Architecture

## Overview

This system is architected with a **master server** and multiple **node servers** to ensure scalability and efficient processing. The master server manages the frontend application, backend scraping for search functionalities, event generation, and data storage. Multiple node servers handle the processing of events by performing scraping tasks on various web pages. Future enhancements include implementing an auto-scaling group for the node servers based on the volume of pending events, monitored via CloudWatch.

## Architecture Components

### Master Server

- **Frontend Application**: Hosts the user interface, allowing users to interact with the system.
- **Backend Scraper**: Dedicated to handling search-related scraping operations.
- **Event Generation**: Produces events that need to be processed and publishes them to an Amazon SQS (Simple Queue Service) queue.
- **Database Hosting**: Runs MongoDB to manage and store:
  - User data
  - Tracked ticket data
  - Additional application-specific information

### Node Servers

- **Event Processing**: Consume and process events from the SQS queue.
- **Scraping Operations**: Perform scraping tasks on various target web pages based on the events received.

## Event Queue

- **Amazon SQS**: Acts as the messaging queue where the master server publishes events. Node servers subscribe to this queue to retrieve and process events.

## Future Enhancements

- **Auto-Scaling Node Servers**:
  - **Implementation**: Establish an auto-scaling group for node servers to dynamically adjust the number of active nodes based on the number of pending events in the SQS queue.
  - **Monitoring**: Use Amazon CloudWatch to track the queue length and trigger scaling actions accordingly, ensuring optimal resource utilization and performance.


## Technologies Used

- **Frontend**: [React, Next.js]
- **Backend**: [Node.js, Python, Nginx, FlaskApp]
- **Database**: MongoDB
- **Queue Service**: Amazon SQS
- **Monitoring**: Amazon CloudWatch
- **Hosting**: [AWS EC2 t3a.small for master, t3a.medium for nodes]





# THIS IS THE MASTER SERVER:

### Processes to manually start on server reboot:
pm2 start pm2-config.json
su ~/ticket-scraper/webapp

### Webapp live su:
http://18.102.166.102/event-search


### List of active services:
sudo systemctl status nginx
sudo systemctl status flaskapp
sudo systemctl status mongod

### Next builds:
sudo systemctl stop nginx
pm2 delete all
npm run build
pm2 start pm2-config.json
sudo systemctl start nginx 

### Logs flaskapp:
sudo journalctl -u flaskapp.service -f

### Nginx config file:
sudo nano /etc/nginx/conf.d/ticket-scraper.conf

### Fast refresh modified code in python
debug=True here:
app.run(debug=True, host='127.0.0.1', port=5000)

### if you install new libraries and deep chaning better to restart the service:
sudo systemctl restart flaskapp


### PIP LIBRARIES GLOBAL INSTALLATION:
sudo apt install python3-(libraryname)

Using apt to install Python packages is beneficial in environments where system stability is critical, and you want to avoid conflicts between packages managed by pip and the system's package manager. However, this approach might not give you the most recent version of the package compared to installing via pip.

If you need the latest version or need more control over your Python environment, consider using a virtual environment as previously described. For system-wide installations that align with Ubuntu's package management policies, using apt is a suitable choice.

Verify the Installation: After installation, you can verify that pymongo was installed correctly by opening a Python shell and importing pymongo:
python3
import pymongo
print(pymongo.__version__)

installed python packages globally:
sudo apt install python3-flask python3-selenium python3-bs4 python3-chromium-browser  python3-chromium-chromedriver


### Setup flask app with systemctl

Create the service file:

sudo nano /etc/systemd/system/flaskapp.service

Add the following configuration:

[Unit]
Description=Flask application to serve locally
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/ticket-scraper/backend
ExecStart=/usr/bin/python3 /home/ubuntu/ticket-scraper/backend/app.py
Restart=always

[Install]
WantedBy=multi-user.target

some usefull command: 

sudo systemctl daemon-reload
sudo systemctl start flaskapp
sudo systemctl enable flaskapp

sudo systemctl status flaskapp

sudo systemctl start flaskapp
sudo systemctl stop flaskapp
sudo systemctl enable flaskapp
sudo systemctl disable flaskapp
sudo systemctl status flaskapp

sudo systemctl restart flaskapp


### Setup mongdb for ubuntu 24.04 noble
https://computingforgeeks.com/how-to-install-mongodb-server-on-ubuntu/?utm_content=cmp-true

The MongoDB data directory is /var/lib/mongodb
and logs are stored inside the /var/log/mongodb 

Configurations can be customized on the following file.
sudo vim /etc/mongod.conf

Service can be started manually by running the commands below. 
sudo systemctl start mongod
sudo systemctl restart mongod
sudo systemctl stop mongod
sudo systemctl enable mongod

Check error logs using:
sudo tail -f /var/log/mongodb/mongod.log

Start using MongoDB by initialing mongosh session
mongosh

create db:
use tScrapDb

To check which database you are currently using, you can use the db command:
db

Collections:
trackedTickets




