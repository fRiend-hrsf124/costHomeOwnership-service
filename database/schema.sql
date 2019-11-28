CREATE DATABASE IF NOT EXISTS fRiend;

USE fRiend;

CREATE TABLE IF NOT EXISTS properties(
  property_id INTEGER,
  property_zip_code SMALLINT,
  redfin_cost_estimate INTEGER,
  property_tax_rate DECIMAL(5,3),
  insurance_rate DECIMAL(5,3)
);

CREATE TABLE IF NOT EXISTS rates(
  rate_id INTEGER,
  lending_zip_code SMALLINT,
  apr DECIMAL(5,3),
  fee_rate DECIMAL(5,3),
  years TINYINT,
  type VARCHAR(5),
  lender VARCHAR(50),
  cost_low INTEGER,
  cost_high INTEGER,
  origination_year YEAR
);
