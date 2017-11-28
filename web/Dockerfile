FROM alpine

# Initialize
RUN mkdir -p /data/web
WORKDIR /data/web
COPY requirements.txt /data/web/

# Setup Dependencies
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
# COPY . /data/web/

#Setup Frontend
RUN mkdir -p /data/web/coinsim/frontend/src/dist
COPY ./coinsim/frontend/src/package.json /data/web/coinsim/frontend/src/package.json 
COPY ./coinsim/frontend/src/.angular-cli.json /data/web/coinsim/frontend/src/.angular-cli.json
COPY ./coinsim/frontend/src/tsconfig.json /data/web/coinsim/frontend/src/tsconfig.json
COPY ./coinsim/frontend/src/src /data/web/coinsim/frontend/src/src

WORKDIR /data/web/coinsim/frontend/src
RUN yarn install
RUN yarn build

# Clean
RUN apk del -r python3-dev postgresql

# Prepare

WORKDIR /data/web/coinsim
RUN mkdir -p coinsim/static/admin
RUN mkdir /srv/logs
RUN touch /srv/logs/gunicorn.log
RUN touch /srv/logs/access.log
