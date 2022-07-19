import 'package:flutter/material.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:movil/global/enviroment.dart';
import 'package:movil/models/entrada.dart';
import 'package:movil/models/evento.dart';
import 'package:movil/providers/evento_provider.dart';
import 'package:movil/providers/user_provider.dart';
import 'package:movil/services/EventoService.dart';
import 'package:provider/provider.dart';

class EventoScreen extends StatelessWidget {
  const EventoScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    Map arguments = ModalRoute.of(context)?.settings.arguments as Map;
    Evento evento = arguments['evento'];
    return Scaffold(
      appBar: AppBar(
        title: Text(evento.titulo),
      ),
      body: Center(
        child: Column(
          children: [
            Image.network('${Enviroment.apiUrl}/${evento.fotos[0].fileName}',
                width: 300, height: 300),
            Text(evento.descripcion),
            Expanded(
                child: ListView.builder(
                    itemCount: evento.lugares.length,
                    itemBuilder: (_, index) {
                      return ListTile(
                          title: Row(
                        children: [
                          Text(evento.lugares[index].nombre),
                         Expanded(child: SizedBox()),
                          MaterialButton(
                            onPressed: () async {
                              String codigo =
                                  await FlutterBarcodeScanner.scanBarcode(
                                      '#3D8BEF',
                                      'Cancelar',
                                      false,
                                      ScanMode.QR);
                              Entrada? res =await EventoService().obtenerEntrada(codigo);
                              if (codigo == '-1')  {
                                showDialog(
                                    context: context,
                                    builder: (_) => _AlertDialog("Cancelo la operacion","Entrada no registrada"));
                              }
                              if(codigo != '-1' && res==null) {
                                showDialog(context: context, builder: (_)=> _AlertDialog("Error de entrada","Entrada no encontrada"));
                              }
                              if(codigo != '-1' && res!.registro.isNotEmpty){
                                  showDialog(context: context, builder: (_)=>_AlertDialog("Error de entrada", "Entrada ya registrada"));
                              }
                              if(codigo != '-1' && res != null){
                                showDialog(context: context, builder: (_)=>_AlertDialogConfirm(res.id,evento.lugares[index].id ,codigo));
                              }
                            },
                            child: Icon(Icons.camera_alt_rounded,
                                color: Colors.blue),
                          )
                        ],
                      ));
                    }))
          ],
        ),
      ),
    );
  }
}

class _AlertDialog extends StatelessWidget {
  _AlertDialog( this.title ,this.content);
  String title;
  String content;
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(this.title),
      content: Text(this.content),
      actions: <Widget>[
        TextButton(
            child: Text("Cancelar"),
            onPressed: () {
              Navigator.of(context).pop();
            }),
        TextButton(
            child: Text("Aceptar"),
            onPressed: () {
              Navigator.of(context).pop();
            }),
      ],
    );
  }
}

class _AlertDialogConfirm extends StatelessWidget {
  _AlertDialogConfirm(this.entradaId ,this.lugarId,this.codigo);
  String codigo;
  int entradaId;
  int lugarId;
  @override
  Widget build(BuildContext context) {
    final userProvider = Provider.of<UserProvider>(context);
    return AlertDialog(
      title: Text("Registrar entrada"),
      content: Text("Desea registrar esta entrada $codigo"),
      actions: <Widget>[
        TextButton(
            child: Text("Cancelar"),
            onPressed: () {
              Navigator.of(context).pop();
            }),
        TextButton(
            child: Text("Aceptar"),
            onPressed: () async{
              await EventoService().registrarEntrada(entradaId , userProvider.user.nombre,userProvider.user.id,lugarId);
              Navigator.of(context).pop();
              //AQUI SE REGISTRARA LA ENTRADA
            }),
      ],
    );
  }
}
