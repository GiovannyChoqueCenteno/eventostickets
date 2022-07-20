import 'package:app_scanner/const/theme.dart' as theme;
import 'package:flutter/material.dart';

class NavBar extends StatefulWidget {
  const NavBar({Key? key}) : super(key: key);
  @override
  State<NavBar> createState() => _NavBarState();
}

class _NavBarState extends State<NavBar> {
  String selected = "eventosPro";

  void setSelect(String route) {
    print("object");
    setState(() {
      selected = route;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        color: theme.backgroundColor,
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            UserAccountsDrawerHeader(
              accountName: Text(
                "Eduardo",
                style: TextStyle(color: Colors.white),
              ),
              accountEmail: Text(
                "ed@ed.com",
                style: TextStyle(color: Colors.white),
              ),
              currentAccountPicture: CircleAvatar(
                child: ClipOval(
                    child: Image.network(
                  "https://ui-avatars.com/api/?name=eduardo+Rodriguez",
                  width: 90,
                  height: 90,
                  fit: BoxFit.cover,
                )),
              ),
              decoration: BoxDecoration(
                  image: DecorationImage(
                      image: AssetImage("assets/image/bosque.jpg"),
                      fit: BoxFit.cover)),
            ),
            ListTile(
              selected: ("eventosPro" == selected),
              leading: Icon(Icons.event),
              title: Text("Eventos"),
              onTap: () {
                setSelect("eventosPro");
                Navigator.pop(context);
                Navigator.pushReplacementNamed(context, "eventosPro");
              },
            ),
            Divider(),
            ListTile(
              selected: ("closeSession" == selected),
              leading: Icon(Icons.close),
              title: Text("Cerrar Session"),
              onTap: () {
                setSelect("closeSession");
                Navigator.pop(context);
                Navigator.pushReplacementNamed(context, "login");
              },
            )
          ],
        ),
      ),
    );
  }
}
