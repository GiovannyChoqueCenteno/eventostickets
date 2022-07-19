import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:movil/models/user.dart';

class UserSecureStorage{
  static final _storage = FlutterSecureStorage();
  static const _keyuser = "user";
  static Future setUser(String user) async{
    await _storage.write(key: _keyuser, value: user);
  }
  static Future<String> getUser() async => await _storage.read(key: _keyuser) ?? "";
}