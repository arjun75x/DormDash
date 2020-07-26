create table DiningHall(

DiningHallName VARCHAR(255) PRIMARY KEY,

Latitude REAL NOT NULL,

Longitude REAL NOT NULL

)

create table DiningHallTable(

TableID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

Capacity INT NOT NULL,

DiningHallName VARCHAR(255) NOT NULL,

FOREIGN KEY (DiningHallName) REFERENCES DiningHall(DiningHallName)

ON UPDATE CASCADE

ON DELETE CASCADE

)

create table QueueRequest(

QueueRequestID INT PRIMARY KEY,

EnterQueueTime DATE NOT NULL,

ExitQueueTime DATE NOT NULL,

DistanceEstimate REAL NOT NULL,

Preferences VARCHAR(255) NOT NULL,

Canceled BOOLEAN NOT NULL,

DiningHallName VARCHAR(255) NOT NULL,

FOREIGN KEY (DiningHallName) REFERENCES DiningHall(DiningHallName)

ON UPDATE CASCADE

ON DELETE CASCADE

)

create table AdmittedEntry(

EntryID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

MealType VARCHAR(255) NOT NULL,

AdmitOffQueueTime DATE NOT NULL,

GroupArrivalTime DATE NOT NULL,

GroupExitTime DATE NOT NULL,

DistanceEstimate REAL NOT NULL,

TableID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

DiningHallName VARCHAR(255) NOT NULL,

QueueRequestID INT NOT NULL,

FOREIGN KEY (DiningHallName) REFERENCES DiningHall(DiningHallName),

FOREIGN KEY (TableID) REFERENCES DiningHallTable(TableID),

FOREIGN KEY (QueueRequestID) REFERENCES QueueRequest(QueueRequestID)

ON UPDATE CASCADE

ON DELETE CASCADE

)

create table User(

NetID VARCHAR(255) PRIMARY KEY,

DeviceID INT NOT NULL,

Name VARCHAR(255) NOT NULL

)