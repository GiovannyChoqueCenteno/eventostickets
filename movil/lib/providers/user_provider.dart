import 'package:flutter/material.dart';
import 'package:movil/models/user.dart';

class UserProvider extends ChangeNotifier{
    late User _user ;
    set user(User value) {
    _user = value;
      notifyListeners();
    }
    User get user => _user;
}