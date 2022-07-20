import 'package:app_scanner/const/theme.dart';
import 'package:app_scanner/provider/auth/user_provider.dart';
import 'package:app_scanner/provider/evento/evento_provider.dart';
import 'package:app_scanner/screen/eventosproximos/eventos_proximos.dart';
import 'package:app_scanner/screen/login/login_screen.dart';
import 'package:app_scanner/screen/lugar/lugar_screen.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => User(), lazy: true),
        ChangeNotifierProvider(create: (_) => Evento(), lazy: false),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: primaryColor,
        scaffoldBackgroundColor: backgroundColor,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text("App Scanner"),
          centerTitle: true,
        ),
      ),
      initialRoute: "login",
      routes: {
        "login": (BuildContext ctx) => Login(),
        "eventosPro": (BuildContext ctx) => EventosProximos(),
        "lugar": (BuildContext ctx) =>Lugar(),
      },
    );
  }
}
