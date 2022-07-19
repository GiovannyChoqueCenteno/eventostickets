import 'dart:convert';

Entrada entradaFromJson(String str) => Entrada.fromJson(json.decode(str));

String entradaToJson(Entrada data) => json.encode(data.toJson());

class Entrada {
    Entrada({
        required this.id,
        required this.registro,
    });

    int id;
    List<Registro> registro;

    factory Entrada.fromJson(Map<String, dynamic> json) => Entrada(
        id: json["id"],
        registro: List<Registro>.from(json["registro"].map((x) => Registro.fromJson(x))),
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "registro": List<dynamic>.from(registro.map((x) => x.toJson())),
    };
}

class Registro {
    Registro({
        required this.id,
    });

    int id;

    factory Registro.fromJson(Map<String, dynamic> json) => Registro(
        id: json["id"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
    };
}
