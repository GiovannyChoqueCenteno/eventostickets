import 'package:flutter/material.dart';

class DrawerProvider extends ChangeNotifier{
  String _route = '/eventosprox';
  String get route =>_route;

  set route(String value){
    _route = value ; 
    notifyListeners();
  }
}