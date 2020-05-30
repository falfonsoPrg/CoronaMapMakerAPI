create table SYMPTOMS(
    cod_symptom int primary key AUTO_INCREMENT,
    nom_symptom varchar(255)
);

create table USERS(
    id_user int primary key,
    first_name varchar(255),
    last_name varchar(255),
    password varchar(255)
);

create table USER_SYMPTOM(
    id_user int,
    cod_symptom int,
    PRIMARY KEY (`id_user`,`cod_symptom`),
    FOREIGN KEY (id_user) REFERENCES USERS(id_user),
    FOREIGN KEY (cod_symptom) REFERENCES SYMPTOMS(cod_symptom)
);

create table PLACES(
    cod_place int primary key AUTO_INCREMENT,
    place_name varchar(255),
    latitude_place float,
    longitude_place float
);

create table DESTINATIONS(
    id_user int,
    cod_place int,
    time_destination date not null,
    PRIMARY KEY (`id_user`,`cod_place`,`time_destination`),
    FOREIGN KEY (id_user) REFERENCES USERS(id_user),
    FOREIGN KEY (cod_place) REFERENCES PLACES(cod_place)
);

insert into SYMPTOMS values(1,"Feber");
insert into SYMPTOMS values(2,"Cough");
insert into SYMPTOMS values(3,"Difficulty breathing");
insert into SYMPTOMS values(4,"Fatigue");
insert into SYMPTOMS values(5,"Sore throat");
insert into SYMPTOMS values(6,"Congestion");
insert into SYMPTOMS values(7,"Nausea");