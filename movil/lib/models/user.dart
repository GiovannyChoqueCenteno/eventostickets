import 'dart:convert';
User userFromJson(String str) => User.fromJson(json.decode(str));

String userToJson(User data) => json.encode(data.toJson());

class User {
    User({
        required this.id,
        required this.nombre,
        required this.email,
        required this.rolId,
        required this.iat,
        required this.exp,
    });

    int id;
    String nombre;
    String email;
    int rolId;
    int iat;
    int exp;

    factory User.fromJson(Map<String, dynamic> json) => User(
        id: json["id"],
        nombre: json["nombre"],
        email: json["email"],
        rolId: json["rolId"],
        iat: json["iat"],
        exp: json["exp"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "nombre": nombre,
        "email": email,
        "rolId": rolId,
        "iat": iat,
        "exp": exp,
    };
}
