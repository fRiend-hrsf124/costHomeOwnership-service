CREATE DATABASE IF NOT EXISTS fRiend;

USE fRiend;

CREATE TABLE IF NOT EXISTS properties(
  property_id INTEGER NOT NULL,
  property_zip_code SMALLINT,
  redfin_cost_estimate INTEGER,
  property_tax_rate DECIMAL(5,3),
  insurance_rate DECIMAL(5,3),
  CONSTRAINT property_id PRIMARY KEY (property_id)
);


CREATE TABLE IF NOT EXISTS lenders(
  lender_id INTEGER NOT NULL AUTO_INCREMENT,
  lender_logo_url VARCHAR(50),
  lender_nmls INTEGER,
  CONSTRAINT lender_id PRIMARY KEY (lender_id)
);

CREATE TABLE IF NOT EXISTS rates(
  rate_id INTEGER NOT NULL AUTO_INCREMENT,
  lending_zip_code SMALLINT,
  apr DECIMAL(5,3),
  years TINYINT,
  loan_type VARCHAR(5),
  cost_low INTEGER,
  cost_high INTEGER,
  down_payment_min DECIMAL(4,1),
  credit_min SMALLINT,
  lender_id INTEGER,
  origination_year YEAR,
  FOREIGN KEY (lender_id) REFERENCES lenders(lender_id),
  CONSTRAINT rate_id PRIMARY KEY (rate_id)
);