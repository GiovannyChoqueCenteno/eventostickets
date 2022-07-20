import 'dart:convert';

class RegistroEntrada {
    RegistroEntrada({
        required this.ok,
        required this.message,
        required this.registro,
    });

    bool ok;
    String message;
    Registro registro;

    factory RegistroEntrada.fromJson(String str) => RegistroEntrada.fromMap(json.decode(str));

    String toJson() => json.encode(toMap());

    factory RegistroEntrada.fromMap(Map<String, dynamic> json) => RegistroEntrada(
        ok: json["ok"],
        message: json["message"],
        registro: Registro.fromMap(json["data"]),
    );

    Map<String, dynamic> toMap() => {
        "ok": ok,
        "message": message,
        "data": registro.toMap(),
    };
}

class Registro {
    Registro({
      required this.id,
      required this.encargado,
      required this.fecha,
      required this.entradaId,
      required this.encargadoId,
    });

    int id;
    String encargado;
    String fecha;
    int entradaId;
    int encargadoId;

    factory Registro.fromJson(String str) => Registro.fromMap(json.decode(str));

    String toJson() => json.encode(toMap());

    factory Registro.fromMap(Map<String, dynamic> json) => Registro(
        id: json["id"],
        encargado: json["encargado"],
        fecha:json["fecha"],
        entradaId: json["entradaId"],
        encargadoId: json["encargadoId"],
    );

    Map<String, dynamic> toMap() => {
        "id": id,
        "encargado": encargado,
        "fecha": fecha,
        "entradaId": entradaId,
        "encargadoId": encargadoId,
    };
}
