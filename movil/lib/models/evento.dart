import 'dart:convert';

Evento eventoFromJson(String str) => Evento.fromJson(json.decode(str));

String eventoToJson(Evento data) => json.encode(data.toJson());

class Evento {
    Evento({
        required this.id,
        required this.titulo,
        required this.descripcion,
        required this.organizador,
        required this.fotos,
        required this.lugares,
    });

    int id;
    String titulo;
    String descripcion;
    String organizador;
    List<Foto> fotos;
    List<Lugar> lugares;

    factory Evento.fromJson(Map<String, dynamic> json) => Evento(
        id: json["id"],
        titulo: json["titulo"],
        descripcion: json["descripcion"],
        organizador: json["organizador"],
        fotos: List<Foto>.from(json["fotos"].map((x) => Foto.fromJson(x))),
        lugares: List<Lugar>.from(json["lugares"].map((x) => Lugar.fromJson(x))),
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "titulo": titulo,
        "descripcion": descripcion,
        "organizador": organizador,
        "fotos": List<dynamic>.from(fotos.map((x) => x.toJson())),
        "lugares": List<dynamic>.from(lugares.map((x) => x.toJson())),
    };
}

class Foto {
    Foto({
        required this.id,
        required this.fileName,
        required this.eventoId,
    });

    int id;
    String fileName;
    int eventoId;

    factory Foto.fromJson(Map<String, dynamic> json) => Foto(
        id: json["id"],
        fileName: json["fileName"],
        eventoId: json["eventoId"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "fileName": fileName,
        "eventoId": eventoId,
    };
}

class Lugar{
    Lugar({
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

    factory Lugar.fromJson(Map<String, dynamic> json) => Lugar(
        id: json["id"],
        nombre: json["nombre"],
        direccion: json["direccion"],
        longitud: json["longitud"],
        latitud: json["latitud"],
        capacidad: json["capacidad"],
        eventoId: json["eventoId"],
        horario: List<Horario>.from(json["horario"].map((x) => Horario.fromJson(x))),
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "nombre": nombre,
        "direccion": direccion,
        "longitud": longitud,
        "latitud": latitud,
        "capacidad": capacidad,
        "eventoId": eventoId,
        "horario": List<dynamic>.from(horario.map((x) => x.toJson())),
    };
}

class Horario {
    Horario({
        required this.fecha,
        required this.duracion,
    });

    DateTime fecha;
    int duracion;

    factory Horario.fromJson(Map<String, dynamic> json) => Horario(
        fecha: DateTime.parse(json["fecha"]),
        duracion: json["duracion"],
    );

    Map<String, dynamic> toJson() => {
        "fecha": fecha.toIso8601String(),
        "duracion": duracion,
    };
}
