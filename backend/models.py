from datetime import datetime, date
from extensions import db   # no dot


# ------------------------
# Company
# ------------------------
class Company(db.Model):
    __tablename__ = "tbl_company_profile"
    company_id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100), nullable=False)
    gstin = db.Column(db.String(20))
    address = db.Column(db.Text)
    geo_tag = db.Column(db.String(100))
    emergency_contact = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    email = db.Column(db.String(100))

    users = db.relationship("User", backref="company", lazy=True)
    products = db.relationship("Product", backref="company", lazy=True)


# ------------------------
# User
# ------------------------
class User(db.Model):
    __tablename__ = "tbl_user"
    u_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # hashed password
    email = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    security_qn = db.Column(db.String(255))
    security_ans = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    role = db.Column(db.String(50), default="user")

    company_id = db.Column(db.Integer, db.ForeignKey("tbl_company_profile.company_id"))


# ------------------------
# Product
# ------------------------
class Product(db.Model):
    __tablename__ = "product"
    product_sl_no = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey("tbl_company_profile.company_id"))

    total_capacity = db.Column(db.Numeric)
    total_voltage = db.Column(db.Numeric)
    no_of_batt = db.Column(db.Integer)
    batt_type = db.Column(db.String(50))
    subscription_type = db.Column(db.String(50))
    firmware_version = db.Column(db.String(50))

    batteries = db.relationship("BattDescription", backref="product", lazy=True)


# ------------------------
# Battery Description
# ------------------------
class BattDescription(db.Model):
    __tablename__ = "batt_description"
    batt_uid = db.Column(db.Integer, primary_key=True)

    product_sl_no = db.Column(db.Integer, db.ForeignKey("product.product_sl_no"))
    batt_voltage = db.Column(db.Numeric)
    batt_capacity = db.Column(db.Numeric)
    batt_mfg_date = db.Column(db.Date)
    batt_install_date = db.Column(db.Date)
    is_warranty = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(50))

    health_logs = db.relationship("BattHealth", backref="battery", lazy=True)
    faults = db.relationship("BattFaultLog", backref="battery", lazy=True)


# ------------------------
# Battery Health
# ------------------------
class BattHealth(db.Model):
    __tablename__ = "batt_health"
    measurement_id = db.Column(db.Integer, primary_key=True)

    batt_uid = db.Column(db.Integer, db.ForeignKey("batt_description.batt_uid"))
    batt_volt = db.Column(db.Numeric)
    batt_current = db.Column(db.Numeric)
    batt_temp = db.Column(db.Numeric)
    soc = db.Column(db.Numeric)
    position = db.Column(db.String(100))
    batt_remaining_time_min = db.Column(db.Integer)
    batt_severity = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)


# ------------------------
# Battery Fault Log
# ------------------------
class BattFaultLog(db.Model):
    __tablename__ = "batt_fault_log"
    fault_id = db.Column(db.Integer, primary_key=True)

    batt_uid = db.Column(db.Integer, db.ForeignKey("batt_description.batt_uid"))
    fault_type = db.Column(db.String(100))
    detected_at = db.Column(db.DateTime, default=datetime.utcnow)
    severity = db.Column(db.String(50))
    predicted_by = db.Column(db.String(50))
    resolve = db.Column(db.String(50))
    note = db.Column(db.Text)

class AdminAuth(db.Model):
    __tablename__ = "admin_auth"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(50), default="admin")
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    def __repr__(self):
        return f"<AdminAuth {self.username} ({self.role})>"
