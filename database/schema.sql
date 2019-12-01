CREATE DATABASE IF NOT EXISTS fRiend;

USE fRiend;

DROP TABLE IF EXISTS rates;
DROP TABLE IF EXISTS lenders;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS zips;

CREATE TABLE zips(
  zip_code VARCHAR(10) NOT NULL,
  property_tax_rate DECIMAL(5,3),
  CONSTRAINT zip_code PRIMARY KEY (zip_code)
);

CREATE TABLE properties(
  property_id INTEGER NOT NULL,
  zip_code VARCHAR(10),
  redfin_cost_estimate INTEGER,
  insurance_rate DECIMAL(5,3),
  FOREIGN KEY (zip_code) REFERENCES zips(zip_code),
  CONSTRAINT property_id PRIMARY KEY (property_id)
);

CREATE TABLE lenders(
  lender_id INTEGER NOT NULL AUTO_INCREMENT,
  lender_logo_url VARCHAR(80),
  lender_nmls INTEGER,
  CONSTRAINT lender_id PRIMARY KEY (lender_id)
);

CREATE TABLE rates(
  rate_id INTEGER NOT NULL AUTO_INCREMENT,
  zip_code VARCHAR(10),
  apr DECIMAL(5,3),
  term TINYINT,
  loan_type VARCHAR(5),
  cost_low INTEGER,
  cost_high INTEGER,
  down_payment_min DECIMAL(4,1),
  credit_min SMALLINT,
  lender_id INTEGER,
  origination_year YEAR,
  FOREIGN KEY (zip_code) REFERENCES zips(zip_code),
  FOREIGN KEY (lender_id) REFERENCES lenders(lender_id),
  CONSTRAINT rate_id PRIMARY KEY (rate_id)
);