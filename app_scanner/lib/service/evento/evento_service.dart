import 'dart:convert';
import 'package:app_scanner/type/EventoProximo.dart';
import 'package:app_scanner/const/config.dart' as config;
import 'package:app_scanner/type/RegistroEntrada.dart';
import 'package:http/http.dart' as http;

class EventoService {
  Future<List<RespEvento>> getEventosProximos(int id) async {
    List<RespEvento> eventos = [];
    var url = Uri.parse("${config.baseUrl}/api/encargado/proximos/$id");
    try {
      final response = await http.get(url);
      final List responseJson = json.decode(response.body) as List;
      for (Map<String, dynamic> data in responseJson) {
        eventos.add(RespEvento.fromMap(data));
      }
    } catch (error) {
      print("Error EventoService/getEventosProximos:  $error");
    }
    return eventos;
  }

  Future<RegistroEntrada?> RegistrarEntrada(
      String encargado, int entradaId, int encargadoId,int lugarId) async {
    var url = Uri.parse("${config.baseUrl}/api/entrada/registrar");
    Map data = {
      "encargado": "$encargado",
      "entradaId": "$entradaId",
      "encargadoId": "$encargadoId",
      "lugarId":"$lugarId",
    };
    print(data);
    try {
      final response = await http.post(url, headers: {
          'Content-Type': 'application/json; charset=UTF-8',
      },body:jsonEncode(data));
      final registro = RegistroEntrada.fromJson(response.body);
      return registro;
    } catch (error) {
      print("Error EventoService/RegistrarEntrada:  $error");
      return null;
    }
  }
}
