#####################################################################
# Main Dockerfile for the Coinsim Webservice Bootstrap.             #
# It installs the Django backend and builds the Angular project to  #
# the web root volume at /public which is also mounted by nginx.    #
# Version 1.0                                                       #
# Author: Felix Cornelius                                           #
# Project: Coinsim                                                  #
#####################################################################

FROM alpine

# Initialize & Setup Permissions

RUN mkdir -p /data/web
RUN mkdir /public

RUN addgroup -g 1000 -S user
RUN adduser -S -G user -u 1000 -s /bin/bash user

RUN chown -R user:user /public /data/web
RUN chmod -R 700 /public /data/web

# Setup Dependencies

WORKDIR /data/web
COPY requirements.txt /data/web/

RUN apk update
RUN apk upgrade
RUN apk add --update \
	python3 \
	python3-dev \
	postgresql-client \
	postgresql-dev \
	build-base \
	gettext \
	nodejs \
	yarn

# Setup Backend

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
RUN ln -sf /usr/bin/python3 /usr/bin/python

# Copy Files

COPY . /data/web/
WORKDIR /data/web/coinsim/frontend/src

# Build & copy to web root

RUN yarn install
RUN yarn build
RUN cp -r ./dist/. /public

# Set Permissions on web root to rwxr-xr-x

RUN chown -R user:user /public
RUN chmod -R 755 /public

# Clean

RUN apk del -r python3-dev postgresql

# Prepare

WORKDIR /data/web/coinsim
RUN mkdir /srv/logs
RUN touch /srv/logs/gunicorn.log
RUN touch /srv/logs/access.log
