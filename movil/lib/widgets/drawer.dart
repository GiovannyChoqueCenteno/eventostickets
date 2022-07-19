import 'package:flutter/material.dart';
import 'package:movil/providers/drawer_provider.dart';
import 'package:movil/providers/user_provider.dart';
import 'package:provider/provider.dart';

class DrawerWidget extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
      final userProvider = Provider.of<UserProvider>(context);
    return Drawer (
        child : ListView(
          children: [
            DrawerHeader(
              child:  Column(
                mainAxisAlignment:  MainAxisAlignment.start,
                children: [
                  Text(userProvider.user.nombre , style:  TextStyle(
                    fontSize: 20
                  )),
                  SizedBox(height: 20),
                  Text(userProvider.user.email) ,
                  SizedBox(height: 20),
                  Icon(Icons.account_circle , size: 50,)
                ],
              ),
            ),
            ListTile(
              onTap: (){
                  Navigator.pop(context);
                   final drawerProvider = Provider.of<DrawerProvider>(context , listen: false);
                    drawerProvider.route = '/eventosprox';
              },
              leading: Icon(Icons.event , color: Colors.blue,),
              title:  Text('Eventos proximos'),
            ),
            ListTile(
              onTap:(){
                //Implementar despues este logout
              Navigator.pushReplacementNamed(context, "/");
              } ,
              title: Text("Cerrar Sesion" , ),
              leading: Icon(Icons.exit_to_app , color : Colors.blue),
            )
          ],
        )
    );
  }
}