import 'package:flutter/material.dart';
import 'package:movil/models/evento.dart';
import 'package:movil/services/EventoService.dart';

class EventoProvider extends ChangeNotifier{
  List<Evento> eventos = [];


   Future<List<Evento>> obtenerEventos(int id) async{

    var service = EventoService();
    eventos =await service.obtenerEventos(id);
    notifyListeners();
    return eventos;
  }
}