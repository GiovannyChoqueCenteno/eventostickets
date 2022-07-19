import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:movil/global/enviroment.dart';
import 'package:movil/models/evento.dart';
import 'package:movil/providers/evento_provider.dart';
import 'package:movil/providers/user_provider.dart';
import 'package:provider/provider.dart';

class EventosProx extends StatefulWidget {
  @override
  State<EventosProx> createState() => _EventosProxState();
}

class _EventosProxState extends State<EventosProx> {
  
  @override
  Widget build(BuildContext context) {
   
    final eventosProvider = Provider.of<EventoProvider>(context , listen : false);
    final userProvider = Provider.of<UserProvider>(context);
    return FutureBuilder(
        future: eventosProvider.obtenerEventos(userProvider.user.id),
        builder: (_, AsyncSnapshot<List<Evento>> snapshot) {
          if (snapshot.hasData) {
            final eventos = snapshot.data??[];
            return ListView.builder(
                itemCount: eventos.length,
                itemBuilder: (_, index) {
                  return ListTile(
                    onTap: () {
                      Navigator.pushNamed(context, '/evento',
                          arguments: {"evento": eventos[index]});
                    },
                    title: Text(eventos[index].titulo),
                    subtitle: Text(eventos[index].descripcion),
                    leading: Image.network('${Enviroment.apiUrl}/${eventos[index].fotos[0].fileName}',
                      width: 50,
                      height: 50,
                    ),
                  );
                });
          }
          return Center(
            child : CircularProgressIndicator()
          );
        });
  }
}
