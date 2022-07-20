import 'package:app_scanner/const/config.dart' as config;
import 'package:app_scanner/const/theme.dart' as theme;
import 'package:app_scanner/provider/evento/evento_provider.dart';
import 'package:app_scanner/type/EventoProximo.dart';
import 'package:app_scanner/widget/NavBar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class Lugar extends StatelessWidget {
  const Lugar({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final eventop = Provider.of<Evento>(context, listen: true);
    final evento = ModalRoute.of(context)!.settings.arguments as RespEvento;
    final lugares = evento.lugares;

    return Scaffold(
      appBar: AppBar(
        title: const Text("Lugares"),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        physics: const ScrollPhysics(),
        padding: const EdgeInsets.all(10),
        child: Container(
          width: double.infinity,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(evento.titulo, style: StyleTitle()),
              const SizedBox(height: 10),
              ContainerImage(idEvento: 1),
              ListView.builder(
                  physics: const NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  itemCount: lugares.length,
                  itemBuilder: (context, index) {
                    final lugar = lugares[index];
                    return ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        shrinkWrap: true,
                        itemCount: lugar.horario.length,
                        itemBuilder: (context, index) {
                          final horario = lugar.horario[index];
                          return Container(
                            margin: const EdgeInsets.symmetric(vertical: 5),
                            padding: const EdgeInsets.all(10),
                            width: double.infinity,
                            decoration: StyleCard(),
                            child: Row(
                              children: [
                                ContentHorario(
                                    title: lugar.nombre,
                                    horario: horario.fecha),
                                ButtonScanner(onPressed: () async {
                                  String res = await eventop.ScannerEventoLugar(
                                      evento.id, lugar.id);
                                  if (res.length > 0) {
                                    showDialog(
                                      context: context,
                                      builder: (BuildContext context) =>
                                          AlertDialog(
                                        title: const Text('Alert'),
                                        content: Text(res),
                                        actions: <Widget>[
                                          TextButton(
                                            onPressed: () =>
                                                Navigator.pop(context, 'OK'),
                                            child: const Text('OK'),
                                          ),
                                        ],
                                      ),
                                    );
                                  }
                                })
                              ],
                            ),
                          );
                        });
                  })
            ],
          ),
        ),
      ),
      drawer: NavBar(),
    );
  }

  // Styles
  TextStyle StyleTitle() => const TextStyle(
        fontSize: 25,
        fontWeight: FontWeight.bold,
        overflow: TextOverflow.ellipsis,
      );

  BoxDecoration StyleCard() {
    return BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: theme.primaryLightColor,
        boxShadow: [const BoxShadow(blurRadius: 1, offset: Offset(0, 1))]);
  }
}

class ContentHorario extends StatelessWidget {
  ContentHorario({Key? key, required this.title, required this.horario})
      : super(key: key);

  final String title;
  final String horario;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: 6,
      child: Container(
          child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title),
          Text(DateFormat('yyyy-MM-dd | KK:mm').format(DateTime.parse(horario)))
        ],
      )),
    );
  }
}

class ButtonScanner extends StatelessWidget {
  const ButtonScanner({Key? key, required this.onPressed}) : super(key: key);

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Expanded(
        flex: 4,
        child: Container(
            child: TextButton.icon(
          label: Text("scan", style: TextStyle(color: Colors.white)),
          icon: Icon(Icons.qr_code_scanner, color: Colors.white),
          onPressed: () => onPressed(),
          style: ButtonStyle(
            backgroundColor:
                MaterialStateProperty.all<Color>(theme.selectColor),
          ),
        )));
  }
}

class ContainerImage extends StatelessWidget {
  ContainerImage({Key? key, required this.idEvento}) : super(key: key);

  final int idEvento;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 15),
      width: double.infinity,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(10),
        child: FadeInImage(
          placeholder: const AssetImage("assets/image/loading.png"),
          image: NetworkImage("${config.imageEvent}/$idEvento"),
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
