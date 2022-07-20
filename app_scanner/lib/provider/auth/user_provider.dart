import 'package:flutter/cupertino.dart';

class User extends ChangeNotifier {
  String email = "";
  String password = "";

  void singIn(String email, String password) {
    this.email = email;
    this.password = password;
    super.notifyListeners();
  }
}
