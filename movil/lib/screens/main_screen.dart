import 'package:flutter/material.dart';
import 'package:movil/widgets/drawer.dart';
import 'package:movil/widgets/eventosprox.dart';


class MainScreen extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar( 
        title: Text("Lista de Eventos")
      ),
      drawer:    DrawerWidget(),
      body : EventosProx()
    );
  }
}

