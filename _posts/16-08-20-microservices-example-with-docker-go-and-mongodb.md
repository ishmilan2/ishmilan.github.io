---
layout: post_en
title: Microservices - Example with Docker, Go and MongoDB
permalink: /en/blog/microservices-example-with-docker-go-and-mongodb/
translate_es: /blog/microservicios-ejemplo-con-docker-go-mongodb/
lang: en
sidebar: yes
category: [articulo]
tags: [docker, go, mongodb]
image: /images/banners/docker-og.png
excerpt: Steps to start <strong><em>Django</em></strong> projects using <strong><em>Docker</em></strong> as a part of the <strong><em>workflow</em></strong>.
---
<img src="{{ site.baseurl }}/images/banners/django-docker.png" title="Docker - Django" name="Docker - Django" />

### Introduction

**_Cinema is an example project_** which demonstrates the use of **_microservices_** for a fictional movie theater.
The Cinema backend is powered by 4 microservices, all of witch happen to be written in **_Go_**, using **_MongoDB_** for manage the database and **_Docker_** to isolate and deploy the ecosystem.

 * **_Movie Service_**: Provides information like movie ratings, title, etc.
 * **_Show Times Service_**: Provides show times information.
 * **_Booking Service_**: Provides booking information. 
 * **_Users Service_**: Provides movie suggestions for users by communicating with other services.

**_The Cinema use case_** is based on the project written in Python by [umermansoor](https://github.com/umermansoor/microservices).

The proyect structure is based in the knowledge learned in the book: **_Web
Development with Go_** by **_Shiju Varghese_**, ISBN 978-1-4842-1053-6

### Prerequisite

* Docker 1.12
* Docker Compose 1.8

We must **add virtual domains** in order to use each **api entry point**. By default we are using: **movies.local**, **bookings.local**, **users.local** and **showtimes.local**

**Virtual domains** has been defined in `docker-compose.yml` file and configured in `/etc/hosts` file. Add the following line in your `/etc/hosts` file:

```
127.0.0.1   movies.local bookings.local users.local showtimes.local
```


### Source Code

You can download <a href="https://github.com/mmorejon/microservices-docker-go-mongodb" target="_blank">the source code using this link</a>.

### Services diagram

<img src="{{ site.baseurl }}/images/microservices-cinema/deployment-diagram.png" title="Microservices - Cinema" name="Microservices - Cinema" />

## Starting services

```
docker-compose up -d
```

## Stoping services

```
docker-compose stop
```

## Including new changes

If you need change some source code you can deploy it typing:

```
docker-compose build
```

## Restore database information

You can start using an empty database for all microservices, but if you want you can restore a preconfigured data following this steps:

**_Access to mongodb container typing:_**

```
docker exec -it cinema-db /bin/bash
```

**_Restore data typing:_**

```
/backup/restore.sh
```

**_Leave the container:_**

```
exit
```


## Documentation

### User Service

This service returns information about the users of Cinema.

**_Routes:_**

* GET - _http://users.local/users_ : Get all users
* POST - _http://users.local/users_ : Create user
* DELETE - _http://users.local/users/{id}_ : Remove user by id

### Movie Service

This service is used to get information about a movie. It provides the movie title, rating on a 1-10 scale, director and other information.

**_Routes:_**

* GET - _http://movies.local/movies_ : Get all movies
* POST - _http://movies.local/movies_ : Create movie
* GET - _http://movies.local/movies/{id}_ : Get movie by id
* DELETE - _http://movies.local/movies/{id}_ : Remove movie by id

### Showtimes Service

This service is used get a list of movies playing on a certain date.

**_Routes:_**

* GET - _http://showtimes.local/showtimes_ : Get all showtimes
* POST - _http://showtimes.local/showtimes_ : Create showtime
* GET - _http://showtimes.local/showtimes/{id}_ : Get showtime by id
* DELETE - _http://showtimes.local/showtimes/{id}_ : Remove showtime by id

### Booking Service

Used to lookup booking information for users.

**_Routes:_**

* GET - _http://bookings.local/bookings_ : Get all bookings
* POST - _http://bookings.local/bookings_ : Create booking

### Significant Revisions

* [umermansoor](https://github.com/umermansoor/microservices)
