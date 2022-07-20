import 'dart:convert';

class RespEvento {
  RespEvento({
    required this.id,
    required this.titulo,
    required this.descripcion,
    required this.organizador,
    required this.lugares,
  });

  int id;
  String titulo;
  String descripcion;
  String organizador;
  List<Lugares> lugares;

  factory RespEvento.fromJson(String str) => RespEvento.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory RespEvento.fromMap(Map<String, dynamic> json) => RespEvento(
        id: json["id"],
        titulo: json["titulo"],
        descripcion: json["descripcion"],
        organizador: json["organizador"],
        lugares:
            List<Lugares>.from(json["lugares"].map((x) => Lugares.fromMap(x))),
      );

  Map<String, dynamic> toMap() => {
        "id": id,
        "titulo": titulo,
        "descripcion": descripcion,
        "organizador": organizador,
        "lugares": List<dynamic>.from(lugares.map((x) => x.toMap())),
      };
}

class Lugares {
  Lugares({
    required this.id,
    required this.nombre,
    required this.direccion,
    required this.longitud,
    required this.latitud,
    required this.capacidad,
    required this.eventoId,
    required this.horario,
  });

  int id;
  String nombre;
  String direccion;
  String longitud;
  String latitud;
  int capacidad;
  int eventoId;
  List<Horario> horario;

  factory Lugares.fromJson(String str) => Lugares.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory Lugares.fromMap(Map<String, dynamic> json) => Lugares(
        id: json["id"],
        nombre: json["nombre"],
        direccion: json["direccion"],
        longitud: json["longitud"],
        latitud: json["latitud"],
        capacidad: json["capacidad"],
        eventoId: json["eventoId"],
        horario:
            List<Horario>.from(json["horario"].map((x) => Horario.fromMap(x))),
      );

  Map<String, dynamic> toMap() => {
        "id": id,
        "nombre": nombre,
        "direccion": direccion,
        "longitud": longitud,
        "latitud": latitud,
        "capacidad": capacidad,
        "eventoId": eventoId,
        "horario": List<dynamic>.from(horario.map((x) => x.toMap())),
      };
}

class Horario {
  Horario({
    required this.fecha,
    required this.duracion,
  });

  String fecha;
  int duracion;

  factory Horario.fromJson(String str) => Horario.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory Horario.fromMap(Map<String, dynamic> json) => Horario(
        fecha: json["fecha"],
        duracion: json["duracion"],
      );

  Map<String, dynamic> toMap() => {
        "fecha": fecha,
        "duracion": duracion,
      };
}
