import 'package:flutter/material.dart';
import 'package:movil/models/evento.dart';

class EventoCard extends StatelessWidget{
  final Evento _evento;
  EventoCard(this._evento);
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Text(
      _evento.titulo
    );
  }
}