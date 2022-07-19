import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:movil/global/enviroment.dart';
import 'package:movil/models/entrada.dart';
import 'package:movil/models/evento.dart';
import 'package:movil/models/token.dart';
import 'package:movil/utils/user_secure_storage.dart';

class EventoService {
  Future<List<Evento>> obtenerEventos(int id) async {
    final res = await http
        .get(Uri.parse('${Enviroment.apiUrl}/api/encargado/proximos/$id'));
    if (res.statusCode == 200) {
      List<Evento> eventos = [];
      List<dynamic> decoded = await json.decode(res.body);
      for (int i = 0; i < decoded.length; i++) {
        Evento evento = Evento.fromJson(decoded[i]);
        eventos.add(evento);
      }
      return eventos;
    }
    return [];
  }

  Future<bool> login(String email, String password) async {
    final res = await http.post(
        Uri.parse('${Enviroment.apiUrl}/api/usuario/login'),
        body: json.encode({"email": email, "password": password}),
        headers: {"Content-Type": "application/json"});
    if (res.statusCode == 200) {
      Token t = Token.fromJson(json.decode(res.body));
      UserSecureStorage.setUser(t.token);
      return true;
    }
    return false;
  }

  Future<Entrada?> obtenerEntrada(String codigo) async {
    final res = await http
        .get(Uri.parse('${Enviroment.apiUrl}/api/entrada/codigo/$codigo'));
    if (res.statusCode == 200) {
      final decode = json.decode(res.body);
      Entrada e = Entrada.fromJson(decode);
      //Aqui va la entrada id
      return e;
    }
    return null;
  }

  Future registrarEntrada(
      int entradaId, String encargado, int encargadoId, int lugarId) async {
    await http.post(Uri.parse('${Enviroment.apiUrl}/api/entrada/registrar'),
        body: json.encode({
          "entradaId": entradaId,
          "encargado": encargado,
          "encargadoId": encargadoId,
          "lugarId": lugarId
        }),
        headers: {"Content-Type": "application/json"});
  }
}
