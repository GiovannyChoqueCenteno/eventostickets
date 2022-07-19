import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:movil/providers/evento_provider.dart';
import 'package:movil/providers/user_provider.dart';
import 'package:movil/screens/evento_screen.dart';
import 'package:movil/screens/main_screen.dart';
import 'package:movil/screens/login_screen.dart';
import 'package:provider/provider.dart';
import 'package:movil/providers/drawer_provider.dart';
import 'package:movil/providers/login_form_provider.dart';

final storage = FlutterSecureStorage();
void main(){
  runApp(MyApp());
}

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_)=>DrawerProvider()),
        ChangeNotifierProvider(create: (_)=>LoginFormProvider()),
        ChangeNotifierProvider(create: (_)=>EventoProvider()),
        ChangeNotifierProvider(create : (_)=>UserProvider())
      ],
      child: (
        MaterialApp(
          title : 'Tickets',
          debugShowCheckedModeBanner: false,
          initialRoute : '/',
          routes:  {
            '/' : (context) =>const  LoginScreen(),
            "/main" : (_)=> MainScreen(),
            "/evento" : (_)=>EventoScreen()
          },
      )
      ),
    );
  }
}