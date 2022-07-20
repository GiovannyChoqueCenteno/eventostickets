import 'package:app_scanner/const/config.dart' as config;
import 'package:app_scanner/provider/evento/evento_provider.dart';
import 'package:app_scanner/widget/NavBar.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class EventosProximos extends StatelessWidget {
  EventosProximos({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final eventop = Provider.of<Evento>(context, listen: true);

    return Scaffold(
        appBar: AppBar(
          title: const Text("Eventos Proximos"),
          centerTitle: true,
        ),
        body: ListView.builder(
            padding: const EdgeInsets.all(10),
            itemCount: eventop.eventosProximos.length,
            itemBuilder: (context, index) {
              final evento = eventop.eventosProximos[index];
              return GestureDetector(
                onTap: () => Navigator.pushNamed(context, "lugar",arguments: evento),
                child: Container(
                  padding: const EdgeInsets.all(10),
                  margin: const EdgeInsets.symmetric(vertical: 10),
                  height: 200,
                  width: double.infinity,
                  decoration: Card(),
                  child: Row(
                    children: [
                      ImagePoster(idEVento: evento.id),
                      Description(
                          title: evento.titulo, description: evento.descripcion)
                    ],
                  ),
                ),
              );
            }),
            drawer: NavBar(),
      );  
  }

  // Styles
  BoxDecoration Card() {
    return BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: Colors.white,
        boxShadow: [const BoxShadow(blurRadius: 1, offset: Offset(1, 1))]);
  }
}

class Description extends StatelessWidget {
  const Description({
    Key? key,
    required this.title,
    required this.description,
  }) : super(key: key);

  final String title;
  final String description;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: 5,
      child: Container(
        padding: const EdgeInsets.all(10),
        height: double.infinity,
        child: Column(
          children: [
            Text(title,
                style:
                    const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                maxLines: 2),
            SizedBox(height: 5),
            Text(description, maxLines: 5, textAlign: TextAlign.justify)
          ],
        ),
      ),
    );
  }
}

class ImagePoster extends StatelessWidget {
  final int idEVento;

  ImagePoster({Key? key, required this.idEVento}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: 5,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(10),
        child: FadeInImage(
          placeholder: const AssetImage("assets/image/loading.png"),
          image: NetworkImage("${config.imageEvent}/$idEVento"),
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
