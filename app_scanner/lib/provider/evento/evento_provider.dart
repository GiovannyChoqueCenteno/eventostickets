import 'dart:convert';

import 'package:app_scanner/const/theme.dart' as theme;
import 'package:app_scanner/service/evento/evento_service.dart';
import 'package:app_scanner/type/EventoProximo.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';

class Evento extends ChangeNotifier {
  List<RespEvento> eventosProximos = [];
  final EventoService _eventoservice = EventoService();

  Evento() {
    getEventosProximos();
  }

  Future<void> getEventosProximos() async {
    final res = await _eventoservice.getEventosProximos(4);
    eventosProximos = res;
    super.notifyListeners();
  }

  Future<String> ScannerEventoLugar(int idevento, int idlugar) async {
    String barcodeScanRes = await FlutterBarcodeScanner.scanBarcode(
        "#8db5e0", "Cancelar", false, ScanMode.QR);
    if (barcodeScanRes == "-1") {
      print("Cancel Scanner");
      return "";
    }
    print("Dectecto QR $barcodeScanRes");

    if (!barcodeScanRes.contains("{")) {
      return "Error al decodificar el qr intentelo de nuevo!!!";
    }

    final dataqr = json.decode(barcodeScanRes);
    int qrlugar = dataqr["lugarId"];
    int qrevento = dataqr["eventoId"];
    int qrentrada = dataqr["entradaId"];
    if (qrevento != idevento || qrlugar != idlugar) {
      print("La entrada Evento Lugar es diferente!!!");
      return "La entrada Evento Lugar es diferente!!!";
    }

    final result = await _eventoservice.RegistrarEntrada(
        "david@gmail.com", qrentrada, 4, qrlugar);
    if (result == null) {
      return "Error en el server!!!";
    }
    if (result.ok) {
      return result.message;
    }
    return "${result.message}\n fecha:${result.registro.fecha}\n Encargado:${result.registro.encargado}";
  }
}
