DROP TABLE city_table;
DROP TABLE state_table;
DROP TABLE state_combined;

SELECT * FROM city_table;
SELECT * FROM state_table;
SELECT * FROM state_combined;

CREATE TABLE city_table (
index INT PRIMARY KEY,
city TEXT,
state TEXT,
county TEXT,
dec_2010 FLOAT,
dec_2011 FLOAT,
dec_2012 FLOAT,
dec_2013 FLOAT,
dec_2014 FLOAT,
dec_2015 FLOAT,
dec_2016 FLOAT,
dec_2017 FLOAT,
dec_2018 FLOAT,
dec_2019 FLOAT,
dec_2020 FLOAT
);

CREATE TABLE state_table (
index INT PRIMARY KEY,
state TEXT,
dec_2010 FLOAT,
dec_2011 FLOAT,
dec_2012 FLOAT,
dec_2013 FLOAT,
dec_2014 FLOAT,
dec_2015 FLOAT,
dec_2016 FLOAT,
dec_2017 FLOAT,
dec_2018 FLOAT,
dec_2019 FLOAT,
dec_2020 FLOAT
);

CREATE TABLE state_combined (
index INT PRIMARY KEY,
state TEXT,
"agg_median_price" FLOAT
);
