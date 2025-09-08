from flask import Flask, jsonify, request
from extensions import db, migrate, jwt
from config import Config
import models
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS 

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}})
    
    @app.route("/")
    def home():
        return jsonify({"message": "BMS Admin Dashboard API Running"})

    # -------------------
    # Companies API
    # -------------------
    @app.route("/companies")
    def companies():
        comps = models.Company.query.all()
        return jsonify([{"id": c.company_id, "name": c.company_name} for c in comps])

    # -------------------
    # Users API
    # -------------------
    @app.route("/users")
    def users():
        usrs = models.User.query.all()
        return jsonify([
            {"u_id": u.u_id, "username": u.username, "email": u.email, "role": u.role}
            for u in usrs
        ])

    # -------------------
    # Auth: Register
    # -------------------
    @app.route("/admin/register", methods=["POST"])
    def admin_register():
        data = request.get_json()
        if not data.get("username") or not data.get("password") or not data.get("email"):
            return jsonify({"error": "Missing username, email, or password"}), 400

        existing = models.AdminAuth.query.filter(
            (models.AdminAuth.username == data["username"]) |
            (models.AdminAuth.email == data["email"])
        ).first()
        if existing:
            return jsonify({"error": "Admin already exists"}), 400

        new_admin = models.AdminAuth()
        new_admin.username = data["username"]
        new_admin.email = data["email"]
        new_admin.password = generate_password_hash(data["password"])
        new_admin.role = "admin"

        db.session.add(new_admin)
        db.session.commit()
        db.session.refresh(new_admin)  

        return jsonify({"message": "Admin registered successfully"}), 201

    # -------------------
    # Auth: Login
    # -------------------
    @app.route("/admin/login", methods=["POST"])
    def admin_login():
        data = request.get_json()
        admin = models.AdminAuth.query.filter_by(username=data["username"]).first()

        if not admin or not check_password_hash(admin.password, data["password"]):
            return jsonify({"error": "Invalid credentials"}), 401

        token = create_access_token(identity=admin.id)
        return jsonify({
            "access_token": token,
            "username": admin.username,
            "email": admin.email,
            "role": admin.role
        }), 200


    # -------------------
    # Auth: Current User
    # -------------------
    @app.route("/me", methods=["GET"])
    @jwt_required()
    def me():
        admin_id = get_jwt_identity()
        admin = models.AdminAuth.query.get(admin_id)
        if not admin:
            return jsonify({"error": "Admin not found"}), 404

        return jsonify({
            "id": admin.id,
            "username": admin.username,
            "email": admin.email,
            "role": admin.role
        })


    return app


app = create_app()
app.run(debug=True)
