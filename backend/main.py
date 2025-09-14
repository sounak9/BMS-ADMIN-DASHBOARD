from flask import Flask, jsonify, request
from extensions import db, migrate, jwt
from config import Config
from models import (
    db,
    CompanyProfile,
    TblUser,
    BattDescription,
    BattFaultLog,
    MqttData
)
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from sqlalchemy import func, or_
from datetime import datetime, timedelta


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}})

    # -------------------
    # JWT helper
    # -------------------
    def create_jwt(user):
        return create_access_token(
            identity=user.u_id,
            expires_delta=timedelta(hours=24)
        )

    @app.route("/")
    def home():
        return jsonify({"message": "BMS Admin Dashboard API Running"})

    # -------------------
    # Companies API
    # -------------------
    @app.route("/companies")
    def companies():
        comps = CompanyProfile.query.all()
        return jsonify([{"id": c.company_id, "name": c.company_name} for c in comps])

    # -------------------
    # Users API
    # -------------------
    @app.route("/users", methods=["GET"])
    def get_users():
        users = TblUser.query.all()
        total_users = TblUser.query.count()

        return jsonify({
            "total": total_users,
            "users": [
                {
                    "u_id": u.u_id,
                    "username": u.username,
                    "email": u.email,
                    "phone": u.phone,
                    "role": u.role,
                    "company_id": u.company_id,
                    "created_at": u.created_at.isoformat() if u.created_at else None,
                    "last_login": u.last_login.isoformat() if u.last_login else None,
                }
                for u in users
            ]
        })


    # -------------------
    # Auth: Register
    # -------------------
    @app.route("/api/auth/register", methods=["POST"])
    def register():
        data = request.get_json()

        # Check if username or email already exists
        if TblUser.query.filter_by(username=data["username"]).first():
            return jsonify({"error": "Username already exists"}), 400
        if TblUser.query.filter_by(email=data["email"]).first():
            return jsonify({"error": "Email already exists"}), 400

        # Hash password
        hashed_pw = generate_password_hash(data["password"])

        # Validate company_id (if provided)
        company_id = data.get("company_id")
        if company_id:
            company = CompanyProfile.query.get(company_id)
            if not company:
                return jsonify({"error": f"Company with id {company_id} does not exist"}), 400
        else:
            company_id = None  # allow NULL

        # Create new user
        user = TblUser(
            username=data["username"],
            email=data["email"],
            password=hashed_pw,
            phone=data.get("phone"),
            security_qn=data.get("security_qn"),
            security_ans=data.get("security_ans"),
            role=data.get("role", "user"),
            company_id=company_id,
            created_at=datetime.utcnow(),
            last_login=None,
        )

        db.session.add(user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201

    # -------------------
    # Auth: Login
    # -------------------
    @app.route('/api/auth/login', methods=['POST'])
    def login():
        data = request.get_json()
        identifier = data.get('identifier')  # can be email OR username
        password = data.get('password')

        if not identifier or not password:
            return jsonify({'error': 'Missing identifier or password'}), 400

        user = TblUser.query.filter(
            or_(
                TblUser.email == identifier,
                TblUser.username == identifier
            )
        ).first()

        if user and check_password_hash(user.password, password):
            token = create_jwt(user)
            user.last_login = datetime.utcnow()
            db.session.commit()
            return jsonify({
                'message': 'Login successful',
                'token': token,
                'u_id': user.u_id,
                'username': user.username,
                'email': user.email,
                'role': user.role
            }), 200

        return jsonify({'error': 'Invalid credentials'}), 401

    # -------------------
    # Current User
    # -------------------
    @app.route("/me", methods=["GET"])
    @jwt_required()
    def me():
        user_id = get_jwt_identity()
        user = TblUser.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        return jsonify({
            "id": user.u_id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        })

    # -------------------
    # Batteries (latest MQTT data per battery)
    # -------------------
    @app.route("/batteries", methods=["GET"])
    def batteries():
        # subquery: latest record per battery
        subq = (
            db.session.query(
                MqttData.battery_id,
                func.max(MqttData.ts).label("latest_ts")
            )
            .group_by(MqttData.battery_id)
            .subquery()
        )

        latest_records = (
            db.session.query(MqttData)
            .join(
                subq,
                (MqttData.battery_id == subq.c.battery_id)
                & (MqttData.ts == subq.c.latest_ts)
            )
            .all()
        )

        # all records (history)
        all_records = MqttData.query.order_by(MqttData.ts.desc()).all()

        return jsonify({
            "latest": [
                {
                    "id": m.id,
                    "battery_id": m.battery_id,
                    "voltage": str(m.voltage),
                    "current": str(m.current),
                    "temperature": str(m.temperature),
                    "timestamp": m.ts.isoformat() if m.ts else None,
                }
                for m in latest_records
            ],
            "all": [
                {
                    "id": m.id,
                    "battery_id": m.battery_id,
                    "voltage": str(m.voltage),
                    "current": str(m.current),
                    "temperature": str(m.temperature),
                    "timestamp": m.ts.isoformat() if m.ts else None,
                }
                for m in all_records
            ]
        })


    # -------------------
    # Fault Logs
    # -------------------
    @app.route("/faults")
    def faults():
        faults = BattFaultLog.query.all()
        return jsonify([
            {
                "id": f.fault_id,
                "batt_uid": f.batt_uid,
                "type": f.fault_type,
                "severity": f.severity,
                "detected_at": f.detected_at.isoformat() if f.detected_at else None,
                "note": f.note,
            }
            for f in faults
        ])

    # -------------------
    # Dashboard Stats
    # -------------------
    @app.route("/dashboard/stats")
    def dashboard_stats():
        companies = CompanyProfile.query.count()
        users = TblUser.query.count()
        batteries = db.session.query(MqttData.battery_id).distinct().count()
        faults = BattFaultLog.query.count()

        return jsonify({
            "companies": companies,
            "users": users,
            "batteries": batteries,
            "faults": faults,
        })

    return app


app = create_app()
app.run(debug=True)
